using System.Xml.Linq;
using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Models.HR;
using webapi.Services.HR;
using static System.Runtime.InteropServices.JavaScript.JSType;
using static webapi.Models.HR.EmployeeUpdate;

namespace webapi.Controllers.HR
{
    [ApiController]
    [Route("hr/employees")]
    public class EmployeeController : ControllerBase
    {
        public readonly EmployeeService _employeeService;

        public EmployeeController(EmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpPost(Name = "PagePostEmployee")]
        public IActionResult PagePost([FromBody] Page data)
        {
            var response = _employeeService.PageSelectEmployees(data.PageNumber, data.PageSize);

            return Ok(response);
        }

        [HttpPost(Name = "PostEmployee")]
        public IActionResult Post([FromBody] EmployeeInsertRequest data)
        {
            var response = _employeeService.CreateEmployee(data);

            return Ok(response);
        }



        [HttpPut(Name = "PutEmployee")]
        public IActionResult Put([FromBody] EmployeeUpdateRequest data)
        {
            var response = _employeeService.UpdateEmployee(data);

            return Ok(response);
        }
    }
}
