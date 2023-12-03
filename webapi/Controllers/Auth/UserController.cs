using System.Net;
using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Models.Auth;
using webapi.Services.Auth;

namespace webapi.Controllers.Auth
{
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("/api/auth/user/create", Name = "Create_User")]
        public async Task<IActionResult> CreateUserAsync([FromBody] UserRequest userRequest)
        {
            var result = await _userService.CreateUserAsync(userRequest);

            //Check status from service
            if (result.StatusCode.Equals(HttpStatusCode.Conflict))
                return Conflict(result);
            else if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPut("/api/auth/user/update", Name = "Update_User")]
        public async Task<IActionResult> UpdateUserAsync([FromBody] UserUpdateRequest userRequest)
        {
            var result = await _userService.UpdateUserAsync(userRequest);

            //Check status from service
            if (result.StatusCode.Equals(HttpStatusCode.NotFound))
                return NotFound(result);
            else if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result);

            return Ok(result);
        }


        [HttpPost("/api/auth/user/add-role", Name = "Create_User_Role")]
        public async Task<IActionResult> AddUserRole([FromBody] UserRoleRequest userRoleRequest)
        {
            var result = await _userService.AddUserRole(userRoleRequest);

            //Check status from service
            if (result.StatusCode.Equals(HttpStatusCode.NotFound))
                return NotFound(result);
            else if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result);

            return Ok(result);
        }
    }
}
