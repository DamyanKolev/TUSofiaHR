﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models.Auth;
using webapi.Services.System;

namespace webapi.Controllers.System
{
    [Authorize(Roles = IdentityRoles.Admin)]
    [Authorize(Roles = IdentityRoles.Accountant)]
    [ApiController]
    public class SysContractTypeController : ControllerBase
    {
        private readonly ISysContractTypeService _contractTypeService;

        public SysContractTypeController(ISysContractTypeService contractTypeService)
        {
            _contractTypeService = contractTypeService;
        }

        
        [HttpPost("/api/sys/contract-type/all", Name = "GetContractTypes")]
        public IActionResult GetContractTypes()
        {
            var result = _contractTypeService.GetContractTypes();

            return Ok(result.Response);
        }
    }
}
