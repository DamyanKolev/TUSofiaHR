using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Models.Auth;
using webapi.Services.System;

namespace webapi.Controllers.System
{
    //[Authorize(Roles = IdentityRoles.Admin)]
    //[Authorize(Roles = IdentityRoles.Accountant)]
    [Authorize]
    [ApiController]
    public class SysIconomicActivityController : ControllerBase
    {
        private readonly ISysIconomicActivityService _iconomicActivityService;

        public SysIconomicActivityController(ISysIconomicActivityService iconomicActivityService)
        {
            _iconomicActivityService = iconomicActivityService;
        }

        [HttpPost("/api/sys/iconomic-activity/page", Name = "GetIconomicActivitiesPage")]
        public IActionResult GetIconomicActivitiesPage([FromBody] PageFilterInfo pageInfo)
        {
            var result = _iconomicActivityService.GetIconomicActivitiesPage(pageInfo);

            return Ok(result.Response);
        }
    }
}
