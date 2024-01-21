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
        public ResponseWithStatus<Response> UpdateContract(Contract contract);
        public ResponseWithStatus<DataResponse<PageResponse<ContractView>>> GetContractsPage(PageInfo pageInfo);
        public ResponseWithStatus<DataResponse<Contract>> GetContractById(long contractId);
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
            var employeeContract = new EmployeeContracts { Employee = employee, Contract = contract, IsActive = true };
            _context.EmployeeContracts.Add(employeeContract);
            var changes = _context.SaveChanges();

            if (changes == 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_INSERT_FAILED);
            }
            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_INSERT_SUCCESS);
        }

        public ResponseWithStatus<Response> UpdateContract(Contract contract)
        {
            _context.Update(contract);
            var result = _context.SaveChanges();

            if (result == 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_UPDATE_FAILED);
            }
            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_UPDATE_SUCCESS);
        }

        public ResponseWithStatus<DataResponse<PageResponse<ContractView>>> GetContractsPage(PageInfo pageInfo)
        {
            var contracts = _context.ContractV
                .Select(v => _mapper.Map<ContractView>(v))
                .Skip((pageInfo.PageNumber - 1) * pageInfo.PageSize)
                .Take(pageInfo.PageSize)
                .ToList();
            
            var countRecords = _context.EmployeeV.ToList().Count;
            var pages = (int) Math.Ceiling(Decimal.Divide(countRecords, pageInfo.PageSize));
            PageResponse<ContractView> pageResponse = new (pages, countRecords, contracts);

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, pageResponse);
        }

        public ResponseWithStatus<DataResponse<Contract>> GetContractById(long contractId) {
            var contract = _context.Contracts.Find(contractId);

            if (contract == null) {
                return ResponseBuilder.CreateDataResponseWithStatus<Contract>(HttpStatusCode.OK, MessageConstants.MESSAGE_RECORD_NOT_FOUND, null!);
            }

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, contract);
        }
    }
}
