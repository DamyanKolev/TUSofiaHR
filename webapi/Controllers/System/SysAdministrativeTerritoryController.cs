using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Models.Auth;
using webapi.Services.System;

namespace webapi.Controllers.System
{
    [Authorize(Roles = IdentityRoles.Admin)]
    [Authorize(Roles = IdentityRoles.Accountant)]
    [ApiController]
    public class SysAdministrativeTerritoryController : ControllerBase
    {
        private readonly ISysAdministrativeTerritoryService _admnistrativeTerritoryService;

        public SysAdministrativeTerritoryController(ISysAdministrativeTerritoryService admnistrativeTerritoryService)
        {
            _admnistrativeTerritoryService = admnistrativeTerritoryService;
        }

        [HttpPost("/api/sys/administrative-territory/page", Name = "GetAdministrativeTerritoriesPage")]
        public IActionResult GetAdministrativeTerritoriesPage([FromBody] PageFilterInfo pageInfo)
        {
            var result = _admnistrativeTerritoryService.GetAdministrativeTerritoriesPage(pageInfo);

            return Ok(result.Response);
        }
    }
}
