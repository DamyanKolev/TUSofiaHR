using System.Net;
using webapi.Constants;
using webapi.Models.HR;
using webapi.Models;

namespace webapi.Services.HR
{
    public interface IDepartmentService
    {
        public ResponseWithStatus<Response> CreateDepartment(string departmentName);
        public ResponseWithStatus<Response> UpdateDepartment(Department updateRequest);
        public ResponseWithStatus<Response> DeleteDepartment(int departmentId);
    }
    public class DepartmentService : IDepartmentService
    {
        public readonly DatabaseContext _context;
        public DepartmentService(DatabaseContext context)
        {
            _context = context;
        }

        public ResponseWithStatus<Response> CreateDepartment(string departmentName)
        {
            Department department = new Department() { DepartmentName = departmentName };
            _context.Departments.Add(department);
            var changes = _context.SaveChanges();

            if (changes > 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_INSERT_FAILED);
            }

            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_INSERT_SUCCESS);
        }



        public ResponseWithStatus<Response> UpdateDepartment(Department updateRequest)
        {
            var department = _context.Departments.Find(updateRequest.Id);

            if (department == null)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.NotFound, MessageConstants.MESSAGE_RECORD_NOT_FOUND);
            }

            department.DepartmentName = updateRequest.DepartmentName;
            _context.Update(department);
            var result = _context.SaveChanges();

            if (result > 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_UPDATE_FAILED);
            }
            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_UPDATE_SUCCESS);
        }


        public ResponseWithStatus<Response> DeleteDepartment(int departmentId)
        {
            var department = _context.Departments.Find(departmentId);

            if (department == null)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.NotFound, MessageConstants.MESSAGE_RECORD_NOT_FOUND);
            }

            _context.Departments.Remove(department);
            var result = _context.SaveChanges();

            if (result > 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_DELETE_FAILED);
            }

            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_DELETE_SUCCESS);
        }
    }
}
