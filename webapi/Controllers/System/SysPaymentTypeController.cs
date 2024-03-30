using Microsoft.AspNetCore.Mvc;
using webapi.Services.System;

namespace webapi.Controllers.System
{
    //[Authorize(Roles = IdentityRoles.Admin)]
    //[Authorize(Roles = IdentityRoles.Accountant)]
    [ApiController]
    public class SysPaymentTypeController: ControllerBase
    {
        private readonly ISysPaymentTypeService _paymentTypeService;

        public SysPaymentTypeController(ISysPaymentTypeService paymentTypeService)
        {
            _paymentTypeService = paymentTypeService;
        }

        [HttpPost("/api/sys/insurance-type/all", Name = "GetAllInsuranceType")]
        public IActionResult GetInsuranceType()
        {
            var result = _paymentTypeService.SelectAll();

            return Ok(result.Response);
        }
    }
}
