using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models.HR;
using webapi.Services.HR;

namespace webapi.Controllers.HR
{
    [ApiController]
    public class DepartmentController: ControllerBase
    {
        private readonly IDepartmentService _departmentService;

        public DepartmentController(IDepartmentService departmentService)
        {
            _departmentService = departmentService;
        }

        [Authorize(Roles = "Admin")]
        [Authorize(Roles = "Accountant")]
        [HttpPost("/api/departments/create", Name = "Create_Department")]
        public IActionResult CreateDepartment([FromBody] string departmentName)
        {
            var response = _departmentService.CreateDepartment(departmentName);

            if (response.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(response.Response);

            return Ok(response.Response);
        }


        [Authorize(Roles = "Admin")]
        [Authorize(Roles = "Accountant")]
        [HttpPatch("/api/departments/update", Name = "Update_Departemnt")]
        public IActionResult UpdateDepartment([FromBody] Department department)
        {
            var response = _departmentService.UpdateDepartment(department);

            if (response.StatusCode.Equals(HttpStatusCode.NotFound))
                return NotFound(response.Response);
            else if (response.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(response.Response);

            return Ok(response.Response);
        }

        [Authorize(Roles = "Admin")]
        [Authorize(Roles = "Accountant")]
        [HttpDelete("/api/department/delete", Name = "Delete_Department")]
        public IActionResult DeleteDepartment([FromBody] int departmentId)
        {
            var response = _departmentService.DeleteDepartment(departmentId);

            if (response.StatusCode.Equals(HttpStatusCode.NotFound))
                return NotFound(response.Response);
            else if (response.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(response.Response);

            return Ok(response.Response);
        }
    }
}
