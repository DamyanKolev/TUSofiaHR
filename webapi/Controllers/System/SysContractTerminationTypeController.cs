﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models.Auth;
using webapi.Services.System;

namespace webapi.Controllers.System
{
    //[Authorize(Roles = IdentityRoles.Admin)]
    //[Authorize(Roles = IdentityRoles.Accountant)]
    [Authorize]
    [ApiController]
    public class SysContractTerminationTypeController : ControllerBase
    {
        private readonly ISysContractTerminationTypeService _terminationTypeService;

        public SysContractTerminationTypeController(ISysContractTerminationTypeService terminationTypeService)
        {
            _terminationTypeService = terminationTypeService;
        }


        [HttpGet("/api/sys/termination-types/all", Name = "GetContractTerminationTypesPage")]
        public IActionResult GetContractTerminationTypesPage()
        {
            var result = _terminationTypeService.SelectAll();

            return Ok(result.Response);
        }
    }
}
