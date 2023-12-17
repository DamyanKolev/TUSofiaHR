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
        public ResponseWithStatus<DataResponse<List<EmployeeView>>> GetEmployeesPage(PageInfo pageInfo);
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

            var employeeToPatch = _mapper.Map<EmployeeDTO>(employee);
            updateDTO.Employee.ApplyTo(employeeToPatch);

            _mapper.Map(employeeToPatch, employee);
            _context.Update(employee);
            var result = _context.SaveChanges();

            if (result == 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_UPDATE_FAILED);
            }
            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_UPDATE_SUCCESS);
        }

        public ResponseWithStatus<DataResponse<List<EmployeeView>>> GetEmployeesPage(PageInfo pageInfo)
        {
            var employees = _context.EmployeeV
                .Select(v => _mapper.Map<EmployeeView>(v))
                .OrderBy(p => p.EmployeeId)
                .Skip((pageInfo.PageNumber - 1) * pageInfo.PageSize)
                .Take(pageInfo.PageSize)
                .ToList();

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, employees);
        }
    }
}
