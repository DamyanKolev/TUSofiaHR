using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models.Auth;
using webapi.Services.Auth;

namespace webapi.Controllers.Auth
{
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        public readonly IAuthenticationService _authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
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


        [Authorize]
        [HttpPost("/api/auth/refresh-token", Name = "Refresh_Token")]
        public async Task<IActionResult> RefreshToken()
        {
            var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
            var result = await _authenticationService.RefreshToken(token);

            if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest();

            return Ok(token);

        }


        [HttpPost("/api/auth/validate-token", Name="Token_Validation")]
        public IActionResult TokenValidation()
        {
            //var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
            //var result = _authenticationService.ValidateToken(token);

            //if (result.StatusCode.Equals(HttpStatusCode.BadRequest)) 
            //    return BadRequest();

            return Ok();

        }
    }
}
