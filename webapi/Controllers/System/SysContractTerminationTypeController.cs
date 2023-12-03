using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Services.System;

namespace webapi.Controllers.System
{
    public class SysContractTerminationTypeController : ControllerBase
    {
        private readonly ISysContractTerminationTypeService _terminationTypeService;

        public SysContractTerminationTypeController(ISysContractTerminationTypeService terminationTypeService)
        {
            _terminationTypeService = terminationTypeService;
        }

        [Authorize(Roles = "Admin")]
        [Authorize(Roles = "Accountant")]
        [HttpPost("/api/sys/termination-types/select-all", Name = "Select_All_Contract_Termination_Types")]
        public IActionResult SelectAll()
        {
            var response = _terminationTypeService.SelectAll();

            return Ok(response.Response);
        }
    }
}
