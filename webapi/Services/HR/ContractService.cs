using webapi.Models.HR;
using webapi.Models;
using webapi.Constants;
using AutoMapper;
using System.Net;
using webapi.Models.Views;

namespace webapi.Services.HR
{
    public interface IContractService
    {
        public ResponseWithStatus<Response> CreateContract(EmployeeContractInsert employeeContractInsert);
        public ResponseWithStatus<Response> CreateAnnex(ContractDTO annex);
        public ResponseWithStatus<Response> Update(Contract contract);
        public ResponseWithStatus<DataResponse<PageResponse<ContractV>>> GetContractsPage(PageInfo pageInfo);
        public ResponseWithStatus<DataResponse<Contract>> GetById(int contractId);
        public ResponseWithStatus<DataResponse<Contract>> GetByEmployeeId(int employeeId);
        public ResponseWithStatus<DataResponse<Contract>> GetEmployeeAnnex(int anexId);
    }

    public class ContractService : IContractService
    {
        public readonly DatabaseContext _context;
        public readonly IMapper _mapper;
        public readonly IEmployeeContractService _employeeContractService;

        public ContractService(DatabaseContext context, IMapper mapper, IEmployeeContractService employeeContractService)
        {
            _context = context;
            _mapper = mapper;
            _employeeContractService = employeeContractService; 
        }

        public ResponseWithStatus<Response> CreateContract(EmployeeContractInsert employeeContractInsert)
        {
            var employee = _context.Employees.Find(employeeContractInsert.EmployeeId);
            if (employee == null)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_RECORD_NOT_FOUND);
            }

            var isSuccess = _employeeContractService.SetContractToUnactive(employeeContractInsert.EmployeeId);
            if (!isSuccess)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_INSERT_FAILED);
            }

            var contract = _mapper.Map<Contract>(employeeContractInsert.Contract);
            _context.Contracts.Add(contract);
            _context.SaveChanges();

            EmployeeContracts employeeContract = new EmployeeContracts { EmployeeId = employee.Id, ContractId = contract.Id, IsActive = true };
            _context.EmployeeContracts.Add(employeeContract);
            var changes = _context.SaveChanges();

            if (changes == 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_INSERT_FAILED);
            }
            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_INSERT_SUCCESS);
        }

        public ResponseWithStatus<Response> CreateAnnex(ContractDTO annexDTO)
        {
            var annex = _mapper.Map<Contract>(annexDTO);
            _context.Contracts.Add(annex);
            var changes = _context.SaveChanges();

            if (changes > 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_INSERT_FAILED);
            }

            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_INSERT_SUCCESS);
        }

        public ResponseWithStatus<Response> Update(Contract contract)
        {
            _context.Update(contract);
            var result = _context.SaveChanges();

            if (result == 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_UPDATE_FAILED);
            }
            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_UPDATE_SUCCESS);
        }

        public ResponseWithStatus<DataResponse<PageResponse<ContractV>>> GetContractsPage(PageInfo pageInfo)
        {
            var contracts = _context.ContractV
                .Skip((pageInfo.PageNumber - 1) * pageInfo.PageSize)
                .Take(pageInfo.PageSize)
                .ToList();
            
            var countRecords = _context.EmployeeV.ToList().Count;
            var pages = (int) Math.Ceiling(Decimal.Divide(countRecords, pageInfo.PageSize));
            PageResponse<ContractV> pageResponse = new (pages, countRecords, contracts);

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, pageResponse);
        }

        public ResponseWithStatus<DataResponse<Contract>> GetById(int contractId) {
            var contract = _context.Contracts.Find(contractId);

            if (contract == null) {
                return ResponseBuilder.CreateDataResponseWithStatus<Contract>(HttpStatusCode.OK, MessageConstants.MESSAGE_RECORD_NOT_FOUND, null!);
            }

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, contract);
        }


        public ResponseWithStatus<DataResponse<Contract>> GetByEmployeeId(int employeeId)
        {
            var contract = (from ec in _context.Set<EmployeeContracts>()
                                   join c in _context.Set<Contract>() on ec.ContractId equals c.Id    
                                   join emp in _context.Set<Employee>() on ec.EmployeeId equals emp.Id                                
                                   where ec.EmployeeId == employeeId && ec.IsActive
                                   select c).FirstOrDefault();


            if(contract == null) {
                return ResponseBuilder.CreateDataResponseWithStatus<Contract>(HttpStatusCode.OK, MessageConstants.MESSAGE_RECORD_NOT_FOUND, null!);
            }

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, contract);
        }


        public ResponseWithStatus<DataResponse<Contract>> GetEmployeeAnnex(int employeeId)
        {
            var annex = _context.AnnexV
                .FirstOrDefault(c =>  c.EmployeeId == employeeId);

            if(annex == null)
            {
                return ResponseBuilder.CreateDataResponseWithStatus<Contract>(HttpStatusCode.OK, MessageConstants.MESSAGE_RECORD_NOT_FOUND, null!);
            }

            var contract = _mapper.Map<Contract>(annex);
            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, contract);

        }
    }
}
