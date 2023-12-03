using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Services.System;

namespace webapi.Controllers.System
{
    public class SysIconomicActivityController : ControllerBase
    {
        private readonly ISysIconomicActivityService _iconomicActivityService;

        public SysIconomicActivityController(ISysIconomicActivityService iconomicActivityService)
        {
            _iconomicActivityService = iconomicActivityService;
        }

        [Authorize(Roles = "Admin")]
        [Authorize(Roles = "Accountant")]
        [HttpPost("/api/sys/iconomic-activity/page", Name = "Filter_Select_Iconomic_Activities")]
        public IActionResult FilteredPageSelect([FromBody] PageFilterInfo pageInfo)
        {
            var response = _iconomicActivityService.FilteredPageSelect(pageInfo);

            return Ok(response.Response);
        }
    }
}
