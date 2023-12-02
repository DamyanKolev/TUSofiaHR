using System.Net;
using System.Threading.Channels;
using AutoMapper;
using webapi.Constants;
using webapi.Models;
using webapi.Models.HR;
using static webapi.Models.HR.EmployeeUpdate;

namespace webapi.Services.HR
{
    public interface IEmployeeService
    {
        public ResponseWithStatus<Response> CreateEmployee(EmployeeInsertRequest insertRequest);
        public ResponseWithStatus<Response> UpdateEmployee(EmployeeUpdateRequest updateRequest);
        public ResponseWithStatus<DataResponse<List<Employee>>> PageSelectEmployees(int pageNumber, int pageSize);
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

        public ResponseWithStatus<Response> CreateEmployee(EmployeeInsertRequest insertRequest)
        {
            var data = _mapper.Map<Employee>(insertRequest);
            _context.Employees.Add(data);
            var changes = _context.SaveChanges();

            if (changes > 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_INSERT_FAILED);
            }

            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_INSERT_SUCCESS);
        }

        public ResponseWithStatus<Response> UpdateEmployee(EmployeeUpdateRequest updateRequest)
        {
            var employee = _context.Employees.Find(updateRequest.UpdateId);

            if (employee == null)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.NotFound, MessageConstants.MESSAGE_RECORD_NOT_FOUND);
            }

            _mapper.Map(updateRequest.Data, employee);
            _context.Update(employee);
            var result = _context.SaveChanges();

            if (result > 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_UPDATE_FAILED);
            }
            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_UPDATE_SUCCESS);
        }


        public ResponseWithStatus<DataResponse<List<Employee>>> PageSelectEmployees(int pageNumber, int pageSize)
        {
            var employees = _context.Employees
                .OrderBy(p => p.Id)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, employees);
        }
    }
}
