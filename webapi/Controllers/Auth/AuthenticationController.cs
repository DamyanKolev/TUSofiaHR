﻿using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models.Auth;
using webapi.Services.Auth;

namespace webapi.Controllers.Auth
{
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [HttpPost("/api/auth/login", Name = "Login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var result = await _authenticationService.SingIn(model);

            if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }


        [Authorize]
        [HttpPost("/api/auth/refresh-token", Name = "RefreshToken")]
        public async Task<IActionResult> RefreshToken()
        {
            var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
            var result = await _authenticationService.RefreshToken(token);

            if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }

        [Authorize]
        [HttpGet("/api/auth/validate-token", Name="TokenValidation")]
        public IActionResult TokenValidation()
        {
            return Ok();
        }
    }
}
