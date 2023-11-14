using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Models.HR;
using webapi.Services.HR;

namespace webapi.Controllers.HR
{
    [ApiController]
    [Route("hr/employees")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpPost(Name = "PagePostEmployee")]
        public IActionResult PagePost([FromBody] Page data)
        {
            var response = _employeeService.PageSelectEmployees(data.PageNumber, data.PageSize);

            return Ok(response);
        }


        [HttpPost("/create", Name = "PostEmployee")]
        public IActionResult Post([FromBody] EmployeeInsertRequest data)
        {
            //var response = _employeeService.CreateEmployee(data);

            return Ok(data);
        }



        [HttpPut(Name = "PutEmployee")]
        public IActionResult Put([FromBody] EmployeeUpdateRequest data)
        {
            var response = _employeeService.UpdateEmployee(data);

            return Ok(response);
        }
    }
}
