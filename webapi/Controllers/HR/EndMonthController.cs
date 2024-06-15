using System.Net;
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

            if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }

        [HttpPut("/api/hr/end-month/update", Name = "UpdateEmployeeEndMonth")]
        public IActionResult UpdateEmployeeEndMonth([FromBody] EndMonthDataUpdate updateDTO)
        {
            var result = _endMonthService.UpdateEmployeeEndMonth(updateDTO);

            if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

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


        [HttpGet("/api/hr/end-month/is-month-finished", Name = "IsMonthFinished")]
        public IActionResult IsMonthFinished()
        {
            var result = _endMonthService.IsMonthFinished();

            return Ok(result.Response);
        }
    }
}
