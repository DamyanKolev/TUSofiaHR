﻿using Microsoft.AspNetCore.Authorization;
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
    public class SysPositionController : ControllerBase
    {
        private readonly ISysPositionService _positionService;

        public SysPositionController(ISysPositionService positionService)
        {
            _positionService = positionService;
        }


        [HttpPost("/api/sys/positions/page", Name = "GetSysPositionsPage")]
        public IActionResult GetPositionsPage([FromBody] PageFilterInfo pageInfo)
        {
            var result = _positionService.GetPositionsPage(pageInfo);

            return Ok(result.Response);
        }
    }
}
