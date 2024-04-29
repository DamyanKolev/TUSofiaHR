using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Services.System;

namespace webapi.Controllers.System
{
    //[Authorize(Roles = IdentityRoles.Admin)]
    //[Authorize(Roles = IdentityRoles.Accountant)]
    [Authorize]
    [ApiController]
    public class SysInsuranceTypeController : ControllerBase
    {
        private readonly ISysInsuranceTypesService _insuranceTypesService;

        public SysInsuranceTypeController(ISysInsuranceTypesService insuranceTypesService)
        {
            _insuranceTypesService = insuranceTypesService;
        }

        [HttpPost("/api/sys/insurance-type/all", Name = "GetAllInsuranceType")]
        public IActionResult GetInsuranceType()
        {
            var result = _insuranceTypesService.SelectAll();

            return Ok(result.Response);
        }


        [HttpPost("/api/sys/insurance-type/by-code", Name = "GetInsuranceByCode")]
        public IActionResult GetInsuranceByCode([FromBody] string code)
        {
            var result = _insuranceTypesService.GetInsuranceByCode(code);

            return Ok(result.Response);
        }

    }
}
