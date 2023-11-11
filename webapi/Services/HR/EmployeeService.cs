using AutoMapper;
using webapi.Constants;
using webapi.Models;
using webapi.Models.HR;
using static webapi.Models.HR.EmployeeUpdate;

namespace webapi.Services.HR
{
    public interface IEmployeeService
    {
        public Response CreateEmployee(EmployeeInsertRequest insertRequest);
        public Response UpdateEmployee(EmployeeUpdateRequest updateRequest);
        public DataResponse<List<Employee>> PageSelectEmployees(int pageNumber, int pageSize);
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

        public Response CreateEmployee(EmployeeInsertRequest insertRequest)
        {
            var data = _mapper.Map<Employee>(insertRequest);
            var result = _context.Employees.Add(data);

            if (result != null)
            {
                return new Response("Created", MessageConstants.MESSAGE_INSERT_SUCCESS);
            }

            _context.SaveChanges();

            return new Response("Created", MessageConstants.MESSAGE_INSERT_SUCCESS);
        }

        public Response UpdateEmployee(EmployeeUpdateRequest updateRequest)
        {
            var product = _context.Employees.Find(updateRequest.UpdateId);

            if (product != null)
            {
                _mapper.Map(updateRequest.Data, product);
                var changes = _context.SaveChanges();

                if (changes > 0)
                {
                    return new Response("Failed", MessageConstants.MESSAGE_UPDATE_FAILED);
                }

                return new Response("Success", MessageConstants.MESSAGE_UPDATE_SUCCESS);
            }

            return new Response("Failed", MessageConstants.MESSAGE_UPDATE_FAILED);
        }


        public DataResponse<List<Employee>> PageSelectEmployees(int pageNumber, int pageSize)
        {
            var employees = _context.Employees
                .OrderBy(p => p.Id)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var response = new DataResponse<List<Employee>>("OK", MessageConstants.MESSAGE_SUCCESS_SELECT, employees);

            return response;
        }
    }
}
