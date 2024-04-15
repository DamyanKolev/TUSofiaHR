using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Services.HR;

namespace webapi.Controllers.HR
{
    [Authorize]
    [ApiController]
    public class InitController : ControllerBase
    {
        private readonly IInitService _initService;

        public InitController(IInitService initService)
        {
            _initService = initService;
        }

        [HttpPost("/api/init-hr", Name = "InitHR")]
        public IActionResult InitHR([FromBody] InitAppData initData)
        {
            var result = _initService.InitHR(initData);

            if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }


        [HttpGet("/api/is-init", Name = "IsInit")]
        public IActionResult IsInit()
        {
            var result = _initService.IsInit();

            if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }
    }
}
