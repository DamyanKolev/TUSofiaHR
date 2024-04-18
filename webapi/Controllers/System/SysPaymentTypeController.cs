using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Services.System;

namespace webapi.Controllers.System
{
    //[Authorize(Roles = IdentityRoles.Admin)]
    //[Authorize(Roles = IdentityRoles.Accountant)]
    [Authorize]
    [ApiController]
    public class SysPaymentTypeController: ControllerBase
    {
        private readonly ISysPaymentTypeService _paymentTypeService;

        public SysPaymentTypeController(ISysPaymentTypeService paymentTypeService)
        {
            _paymentTypeService = paymentTypeService;
        }

        [HttpPost("/api/sys/payment-type/all", Name = "GetAllPaymentType")]
        public IActionResult GetPaymentType()
        {
            var result = _paymentTypeService.SelectAll();

            return Ok(result.Response);
        }
    }
}
