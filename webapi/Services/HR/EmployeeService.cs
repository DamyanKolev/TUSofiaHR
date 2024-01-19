using System.Net;
using AutoMapper;
using webapi.Constants;
using webapi.Models;
using webapi.Models.HR;
using webapi.Models.Views;

namespace webapi.Services.HR
{
    public interface IEmployeeService
    {
        public ResponseWithStatus<Response> CreateEmployee(EmployeeDTO employeeDTO);
        public ResponseWithStatus<Response> UpdateEmployee(EmployeeUpdateDTO updateDTO);
        public ResponseWithStatus<DataResponse<PageResponse<EmployeeView>>> GetEmployeesPage(PageInfo pageInfo);
        public ResponseWithStatus<DataResponse<EmployeeDataSelect>> GetUpdateData(EmployeeDataSelectDTO selectDTO);
    }

    public class EmployeeService : IEmployeeService
    {
        public readonly DatabaseContext _context;
        public readonly IMapper _mapper;

        public EmployeeService(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public ResponseWithStatus<Response> CreateEmployee(EmployeeDTO employeeDTO)
        {
            var data = _mapper.Map<Employee>(employeeDTO);
            _context.Employees.Add(data);
            var changes = _context.SaveChanges();

            if (changes > 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_INSERT_FAILED);
            }

            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_INSERT_SUCCESS);
        }

        public ResponseWithStatus<Response> UpdateEmployee(EmployeeUpdateDTO updateDTO)
        {
            var employee = _context.Employees.Find(updateDTO.UpdateId);

            if (employee == null)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.NotFound, MessageConstants.MESSAGE_RECORD_NOT_FOUND);
            }

            _mapper.Map(updateDTO.Employee, employee);
            _context.Update(employee);
            var result = _context.SaveChanges();

            if (result == 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_UPDATE_FAILED);
            }
            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_UPDATE_SUCCESS);
        }

        public ResponseWithStatus<DataResponse<PageResponse<EmployeeView>>> GetEmployeesPage(PageInfo pageInfo)
        {
            var employees = _context.EmployeeV
                .Select(v => _mapper.Map<EmployeeView>(v))
                //.OrderBy(p => p.EmployeeId)
                .Skip((pageInfo.PageNumber - 1) * pageInfo.PageSize)
                .Take(pageInfo.PageSize)
                .ToList();

            var countRecords = _context.EmployeeV.ToList().Count;
            var pages = (int) Math.Ceiling(Decimal.Divide(countRecords, pageInfo.PageSize));
            PageResponse<EmployeeView> pageResponse = new (pages, countRecords, employees);
                
            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, pageResponse);
        }

        public ResponseWithStatus<DataResponse<EmployeeDataSelect>> GetUpdateData(EmployeeDataSelectDTO selectDTO) {
            var employee = _context.Employees.Find(selectDTO.EmployeeId);
            var contract = _context.Contracts.Find(selectDTO.ContractId);
            var personalData = _context.PersonalDatas.Find(selectDTO.PersonalDataId);

            if (employee == null || contract == null || personalData == null) {
                return ResponseBuilder.CreateDataResponseWithStatus<EmployeeDataSelect>(HttpStatusCode.OK, MessageConstants.MESSAGE_RECORD_NOT_FOUND, null!);
            }

            EmployeeDataSelect employeeDataSelect = new (employee, contract ,personalData); 
            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, employeeDataSelect);
        }
    }
}
