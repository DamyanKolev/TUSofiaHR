using Microsoft.AspNetCore.Mvc;
using webapi.Models.Auth;
using webapi.Services.Auth;

namespace webapi.Controllers.Auth
{
    [Route("api/auth")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        public readonly AuthenticationService _authenticationService;

        public AuthenticationController(AuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var result = await _authenticationService.SingIn(model);

            return Ok(result);
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var result = await _authenticationService.Register(model);

            return Ok(result);
        }
    }
}
