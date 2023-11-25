using System.Net;
using Microsoft.AspNetCore.Mvc;
using webapi.Models.Auth;
using webapi.Services.Auth;

namespace webapi.Controllers.Auth
{
    public class RoleController : ControllerBase
    {
        public readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        [HttpPost("/api/auth/role/create", Name = "Create_Role")]
        public async Task<IActionResult> CreateRole([FromBody] RoleRequest roleRequest)
        {
            var result = await _roleService.CreateRoleAsync(roleRequest);

            if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result);

            return Ok(result);
        }



        [HttpPost("/api/auth/role/update", Name = "Update_Role")]
        public async Task<IActionResult> UpdateRole([FromBody] RoleRequest roleRequest)
        {
            //var result = await _roleService.UpdateRoleAsync(roleRequest);

            //if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
            //    return BadRequest(result);

            return Ok();
        }
    }
}
