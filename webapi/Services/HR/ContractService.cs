using webapi.Models.HR;
using webapi.Models;
using webapi.Constants;
using AutoMapper;
using System.Net;
using webapi.Models.Views;
using Newtonsoft.Json.Linq;

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
        public ResponseWithStatus<DataResponse<List<ContractV>>> FindByEmployeeId(int employeeId);
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
            using var transaction = _context.Database.BeginTransaction();
            try {
                var employee = _context.Employees.Find(employeeContractInsert.EmployeeId);
                if (employee == null)
                {
                    return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_RECORD_NOT_FOUND);
                }

                //set last contract inactive
                var previousContract = _context.EmployeeContracts
                    .Where(x => x.EmployeeId == employee.Id)
                    .Where(x => x.IsActive == true)
                    .FirstOrDefault();

                if (previousContract != null)
                {
                    previousContract.IsActive = false;
                    _context.Update(previousContract);
                }

                var contract = _mapper.Map<Contract>(employeeContractInsert.Contract);


                EmployeeContracts employeeContract = new EmployeeContracts
                {
                    EmployeeId = employee.Id,
                    Employee = employee,
                    ContractId = contract.Id,
                    Contract = contract,
                    IsActive = true
                };
                _context.EmployeeContracts.Add(employeeContract);
                _context.SaveChanges();
                transaction.Commit();
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_INSERT_SUCCESS);
            }
            catch (Exception)
            {
                transaction.Rollback();
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_INSERT_FAILED);
            }
        }

        public ResponseWithStatus<Response> CreateAnnex(ContractDTO annexDTO)
        {
            var annex = _mapper.Map<Contract>(annexDTO);
            _context.Contracts.Add(annex);
            var changes = _context.SaveChanges();

            if (changes == 0)
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



        public ResponseWithStatus<DataResponse<List<ContractV>>> FindByEmployeeId(int employeeId)
        {
            var contract = _context.ContractV
                .Where(c => c.EmployeeId == employeeId)
                .ToList();

            if (contract == null)
            {
                return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_RECORD_NOT_FOUND, new List<ContractV>());
            }

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, contract);
        }
    }
}
