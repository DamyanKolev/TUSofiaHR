using Microsoft.AspNetCore.Authorization;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using webapi.Models.HR;
using webapi.Services.HR;
using webapi.Services;
using webapi.Models.System;

namespace webapi.Controllers.HR
{
    public class PositionController : ControllerBase
    {
        private readonly IPositionService _positionService;

        public PositionController(IPositionService positionService)
        {
            _positionService = positionService;
        }

        [Authorize(Roles = "Admin")]
        [Authorize(Roles = "Accountant")]
        [HttpPost("/api/positions/create", Name = "Create_Position")]
        public IActionResult CreatePosition([FromBody] PositionDTO positionRequest)
        {
            var response = _positionService.CreatePosition(positionRequest);

            if (response.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(response.Response);

            return Ok(response.Response);
        }


        //[Authorize(Roles = "Admin")]
        //[Authorize(Roles = "Accountant")]
        [HttpPatch("/api/positions/update", Name = "Update_Position")]
        public IActionResult UpdateDepartment([FromBody] PositionUpdateRequest updateRequest)
        {
            //var response = _positionService.UpdatePosition(updateRequest);

            //if (response.StatusCode.Equals(HttpStatusCode.NotFound))
            //    return NotFound(response.Response);
            //else if (response.StatusCode.Equals(HttpStatusCode.BadRequest))
            //    return BadRequest(response.Response);

            var test = CSVFileProcessor.ParseCSVToList<SysContractDocumentType>("Sys_Contract_Document_Types.csv");

            return Ok(/*response.Response*/ test);
        }

        [Authorize(Roles = "Admin")]
        [Authorize(Roles = "Accountant")]
        [HttpDelete("/api/positions/delete", Name = "Delete_Position")]
        public IActionResult DeleteDepartment([FromBody] int positionId)
        {
            var response = _positionService.DeletePosition(positionId);

            if (response.StatusCode.Equals(HttpStatusCode.NotFound))
                return NotFound(response.Response);
            else if (response.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(response.Response);

            return Ok(response.Response);
        }
    }
}
