using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Services.System;

namespace webapi.Controllers.System
{
    public class SysAdministrativeTerritoryController : ControllerBase
    {
        private readonly ISysAdministrativeTerritoryService _admnistrativeTerritoryService;

        public SysAdministrativeTerritoryController(ISysAdministrativeTerritoryService admnistrativeTerritoryService)
        {
            _admnistrativeTerritoryService = admnistrativeTerritoryService;
        }

        [Authorize(Roles = "Admin")]
        [Authorize(Roles = "Accountant")]
        [HttpPost("/api/sys/administrative-territory/page", Name = "Filter_Select_Administrative_Territories")]
        public IActionResult FilteredPageSelect([FromBody] PageFilterInfo pageInfo)
        {
            var response = _admnistrativeTerritoryService.FilteredPageSelect(pageInfo);

            return Ok(response.Response);
        }
    }
}
