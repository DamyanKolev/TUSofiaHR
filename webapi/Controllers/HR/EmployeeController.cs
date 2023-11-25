using System.Net;
using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Models.HR;
using webapi.Services.HR;

namespace webapi.Controllers.HR
{
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpPost("/api/employees/page", Name = "Get_Page_Data")]
        public IActionResult PagePost([FromBody] PageRequest data)
        {
            var response = _employeeService.PageSelectEmployees(data.PageNumber, data.PageSize);

            return Ok(response);
        }


        [HttpPost("/api/employees/create", Name = "Create_Employee")]
        public IActionResult Post([FromBody] EmployeeInsertRequest data)
        {
            //var response = _employeeService.CreateEmployee(data);

            //if (response.StatusCode.Equals(HttpStatusCode.BadRequest))
            //    return BadRequest(response);

            return Ok(data);
        }



        [HttpPut("/api/employees/update", Name = "Update_Employee")]
        public IActionResult Put([FromBody] EmployeeUpdateRequest data)
        {
            var response = _employeeService.UpdateEmployee(data);

            if (response.StatusCode.Equals(HttpStatusCode.NotFound))
                return NotFound(response);
            else if (response.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(response);

            return Ok(response);
        }
    }
}
