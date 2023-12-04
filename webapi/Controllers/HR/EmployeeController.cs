using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Models.Auth;
using webapi.Models.HR;
using webapi.Services.HR;

namespace webapi.Controllers.HR
{
    [Authorize(Roles = IdentityRoles.Admin)]
    [Authorize(Roles = IdentityRoles.Accountant)]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpPost("/api/employees/create", Name = "CreateEmployee")]
        public IActionResult Post([FromBody] EmployeeDTO data)
        {
            var result = _employeeService.CreateEmployee(data);

            if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }


        [HttpPatch("/api/employees/update", Name = "UpdateEmployee")]
        public IActionResult Put([FromBody] EmployeeUpdateDTO updateDTO)
        {
            var result = _employeeService.UpdateEmployee(updateDTO);

            if (result.StatusCode.Equals(HttpStatusCode.NotFound))
                return NotFound(result.Response);
            else if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }

        [HttpPost("/api/employees/page", Name = "GetEmployeesPage")]
        public IActionResult GetEmployeesPage([FromBody] PageInfo pageInfo)
        {
            var result = _employeeService.GetEmployeesPage(pageInfo);

            return Ok(result.Response);
        }
    }
}
