using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models.Auth;
using webapi.Services.Auth;

namespace webapi.Controllers.Auth
{
    [Authorize(Roles = IdentityRoles.Admin)]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("/api/auth/user/create", Name = "CreateUser")]
        public async Task<IActionResult> CreateUser([FromBody] UserDTO userDTO)
        {
            var result = await _userService.CreateUser(userDTO);

            //Check status from service
            if (result.StatusCode.Equals(HttpStatusCode.Conflict))
                return Conflict(result.Response);
            else if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }

        [HttpPatch("/api/auth/user/update", Name = "UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromBody] UserUpdateDTO updateDTO)
        {
            var result = await _userService.UpdateUser(updateDTO);

            //Check status from service
            if (result.StatusCode.Equals(HttpStatusCode.NotFound))
                return NotFound(result.Response);
            else if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }


        [HttpPost("/api/auth/user/add-role", Name = "AddUserRole")]
        public async Task<IActionResult> AddUserRole([FromBody] UserRoleDTO userRoleDTO)
        {
            var result = await _userService.AddUserRole(userRoleDTO);

            if (result.StatusCode.Equals(HttpStatusCode.NotFound))
                return NotFound(result.Response);
            else if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }
    }
}
