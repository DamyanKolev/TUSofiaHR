using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Models.Auth;
using webapi.Models.HR;
using webapi.Services.HR;

namespace webapi.Controllers.HR
{
    // [Authorize(Roles = IdentityRoles.Admin)]
    // [Authorize(Roles = IdentityRoles.Accountant)]
    [Authorize]
    [ApiController]
    public class DepartmentController: ControllerBase
    {
        private readonly IDepartmentService _departmentService;

        public DepartmentController(IDepartmentService departmentService)
        {
            _departmentService = departmentService;
        }


        [HttpPost("/api/departments/create", Name = "CreateDepartment")]
        public IActionResult CreateDepartment([FromBody] DepartmentDTO departmentInsert)
        {
            var result = _departmentService.CreateDepartment(departmentInsert);

            if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }


        [HttpPut("/api/departments/update", Name = "UpdateDepartemnt")]
        public IActionResult UpdateDepartment([FromBody] Department department)
        {
            var result = _departmentService.UpdateDepartment(department);

            if (result.StatusCode.Equals(HttpStatusCode.NotFound))
                return NotFound(result.Response);
            else if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }


        [HttpDelete("/api/departments/delete", Name = "DeleteDepartment")]
        public IActionResult DeleteDepartment([FromBody] int departmentId)
        {
            var result = _departmentService.DeleteDepartment(departmentId);

            if (result.StatusCode.Equals(HttpStatusCode.NotFound))
                return NotFound(result.Response);
            else if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }


        [HttpPost("/api/departments/page", Name = "GetDepartmentsPage")]
        public IActionResult GetDepartmentsPage([FromBody] PageInfo pageInfo)
        {
            var result = _departmentService.GetDepartmentsPage(pageInfo);

            return Ok(result.Response);
        }


        [HttpGet("/api/departments/all", Name = "GetAllDepartments")]
        public IActionResult GetAllDepartments(){
            var result = _departmentService.GetAllDepartments();

            return Ok(result.Response);
        }
    }
}
