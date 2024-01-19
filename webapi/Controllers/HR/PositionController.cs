using Microsoft.AspNetCore.Authorization;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using webapi.Models.HR;
using webapi.Services.HR;
using webapi.Models.Auth;
using webapi.Models;

namespace webapi.Controllers.HR
{
    // [Authorize(Roles = IdentityRoles.Admin)]
    // [Authorize(Roles = IdentityRoles.Accountant)]
    [ApiController]
    public class PositionController : ControllerBase
    {
        private readonly IPositionService _positionService;

        public PositionController(IPositionService positionService)
        {
            _positionService = positionService;
        }

        [HttpPost("/api/positions/create", Name = "CreatePosition")]
        public IActionResult CreatePosition([FromBody] PositionDTO positionDTO)
        {
            var result = _positionService.CreatePosition(positionDTO);

            if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }


        [HttpPatch("/api/positions/update", Name = "UpdatePosition")]
        public IActionResult UpdateDepartment([FromBody] PositionUpdateDTO updateDTO)
        {
            var result = _positionService.UpdatePosition(updateDTO);

            if (result.StatusCode.Equals(HttpStatusCode.NotFound))
                return NotFound(result.Response);
            else if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }


        [HttpDelete("/api/positions/delete", Name = "DeletePosition")]
        public IActionResult DeleteDepartment([FromBody] int positionId)
        {
            var result = _positionService.DeletePosition(positionId);

            if (result.StatusCode.Equals(HttpStatusCode.NotFound))
                return NotFound(result.Response);
            else if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }

        [HttpPost("/api/positions/page", Name = "GetPositionsPage")]
        public IActionResult GetPositionsPage([FromBody] PageInfo pageInfo)
        {
            var result = _positionService.GetPositionsPage(pageInfo);

            return Ok(result.Response);
        }


        [HttpGet("/api/positions/all", Name = "GetAllPositions")]
        public IActionResult GetAllPositions(){
            var result = _positionService.GetAllPositions();

            return Ok(result.Response);
        }
    }
}
