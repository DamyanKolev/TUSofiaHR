using System.Net;
using webapi.Constants;
using webapi.Models.HR;
using webapi.Models;

namespace webapi.Services.HR
{
    public interface IDepartmentService
    {
        public ResponseWithStatus<Response> CreateDepartment(DepartmentInsert departmentInsert);
        public ResponseWithStatus<Response> UpdateDepartment(Department updateRequest);
        public ResponseWithStatus<Response> DeleteDepartment(int departmentId);
        public ResponseWithStatus<DataResponse<PageResponse<Department>>> GetDepartmentsPage(PageInfo pageInfo);
        public ResponseWithStatus<DataResponse<List<Department>>> GetAllDepartments();

    }
    public class DepartmentService : IDepartmentService
    {
        public readonly DatabaseContext _context;
        public DepartmentService(DatabaseContext context)
        {
            _context = context;
        }

        public ResponseWithStatus<Response> CreateDepartment(DepartmentInsert departmentInsert)
        {
            Department department = new Department() { DepartmentName = departmentInsert.DepartmentName };
            _context.Departments.Add(department);
            var result = _context.SaveChanges();
            if(result == 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_INSERT_FAILED);
            }

            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_INSERT_SUCCESS);
        }



        public ResponseWithStatus<Response> UpdateDepartment(Department updateRequest)
        {
            _context.Update(updateRequest);
            var result = _context.SaveChanges();

            if (result == 0)
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

            if (result == 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_DELETE_FAILED);
            }

            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_DELETE_SUCCESS);
        }


        public ResponseWithStatus<DataResponse<PageResponse<Department>>> GetDepartmentsPage(PageInfo pageInfo)
        {
            var departments = _context.Departments
                .OrderBy(p => p.Id)
                .Skip((pageInfo.PageNumber - 1) * pageInfo.PageSize)
                .Take(pageInfo.PageSize)
                .ToList();

            var countRecords = _context.EmployeeV.ToList().Count;
            var pages = (int) Math.Ceiling(Decimal.Divide(countRecords, pageInfo.PageSize));
            PageResponse<Department> pageResponse = new (pages, countRecords, departments);

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, pageResponse);
        }


        public ResponseWithStatus<DataResponse<List<Department>>> GetAllDepartments(){
            var departments = _context.Departments.ToList();

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, departments);
        }
    }
}
