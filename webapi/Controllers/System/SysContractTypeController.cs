using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Services.System;

namespace webapi.Controllers.System
{
    public class SysContractTypeController : ControllerBase
    {
        private readonly ISysContractTypeService _contractTypeService;

        public SysContractTypeController(ISysContractTypeService contractTypeService)
        {
            _contractTypeService = contractTypeService;
        }

        [Authorize(Roles = "Admin")]
        [Authorize(Roles = "Accountant")]
        [HttpPost("/api/sys/contract-type/select-all", Name = "Select_All_Contract_Types")]
        public IActionResult SelectAll()
        {
            var response = _contractTypeService.SelectAll();

            return Ok(response.Response);
        }
    }
}
