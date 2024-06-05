using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models.HR;
using webapi.Services.HR;

namespace webapi.Controllers.HR
{
    [Authorize]
    [ApiController]
    public class EndMonthController : ControllerBase
    {
        private readonly IEndMonthService _endMonthService;
        public EndMonthController(IEndMonthService endMonthService)
        {
            _endMonthService = endMonthService;
        }


        [HttpPost("/api/hr/end-month/create", Name = "EndMonth")]
        public IActionResult EndMonth([FromBody] EndMonthDataInsert insertDTO)
        {
            var result = _endMonthService.EndMonth(insertDTO);

            return Ok(result.Response);
        }

        [HttpPost("/api/hr/end-month/select", Name = "SelectEndMonthData")]
        public IActionResult SelectEndMonthData([FromBody] int employeeId)
        {
            var result = _endMonthService.SelectEndMonthData(employeeId);

            return Ok(result.Response);
        }

        [HttpPost("/api/hr/end-month/finish", Name = "FinishMonth")]
        public IActionResult FinishMonth()
        {
            var result = _endMonthService.FinishMonth();

            return Ok(result.Response);
        }


        [HttpPost("/api/hr/end-month/is-filled", Name = "IsFilledAllEmployeesMonthData")]
        public IActionResult IsFilledAllEmployeesMonthData()
        {
            var result = _endMonthService.IsFilledAllEmployeesMonthData();

            return Ok(result.Response);
        }
    }
}
