using System.Net;
using Microsoft.AspNetCore.Mvc;
using webapi.Models.Auth;
using webapi.Services.Auth;

namespace webapi.Controllers.Auth
{
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        public readonly AuthenticationService _authenticationService;

        public AuthenticationController(AuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [HttpPost("/api/auth/login", Name = "User_Login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var result = await _authenticationService.SingIn(model);

            if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result);

            return Ok(result);
        }


        [HttpPost("/api/auth/register", Name="User_Registration")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var result = await _authenticationService.Register(model);

            //Check status from service
            if (result.StatusCode.Equals(HttpStatusCode.Conflict)) 
                return Conflict(result);
            else if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result);

            return Ok(result);
        }


        [HttpPost("/api/auth/validate-token", Name="Token_Validation")]
        public async Task<IActionResult> TokenValidation([FromBody] String token)
        {
            var result = _authenticationService.ValidateToken(token);

            if (result.StatusCode.Equals(HttpStatusCode.BadRequest)) 
                return BadRequest();

            return Ok();

        }
    }
}
