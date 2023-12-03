using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Services.System;

namespace webapi.Controllers.System
{
    public class SysPositionController : ControllerBase
    {
        private readonly ISysPositionService _positionService;

        public SysPositionController(ISysPositionService positionService)
        {
            _positionService = positionService;
        }

        [Authorize(Roles = "Admin")]
        [Authorize(Roles = "Accountant")]
        [HttpPost("/api/sys/positions/page", Name = "Filter_Select_Positions")]
        public IActionResult FilteredPageSelect([FromBody] PageFilterInfo pageInfo)
        {
            var response = _positionService.FilteredPageSelect(pageInfo);

            return Ok(response.Response);
        }
    }
}
