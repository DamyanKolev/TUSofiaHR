using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models.Auth;
using webapi.Services.Auth;

namespace webapi.Controllers.Auth
{
    [Authorize(Roles = IdentityRoles.Admin)]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        [HttpPost("/api/auth/role/create", Name = "CreateRole")]
        public async Task<IActionResult> CreateRole([FromBody] RoleDTO roleDTO)
        {
            var result = await _roleService.CreateRole(roleDTO);

            if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }



        [HttpPost("/api/auth/role-claims/create", Name = "CreateRoleClaims")]
        public async Task<IActionResult> CreateRoleClaims([FromBody] ClaimDTO claimDTO)
        {
            var result = await _roleService.CreateRoleClaims(claimDTO);

            if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result);
            else if (result.StatusCode.Equals(HttpStatusCode.NotFound))
                return NotFound(result);

            return Ok(result);
        }



        [HttpDelete("/api/auth/role-claims/delete", Name = "DeleteRoleClaims")]
        public async Task<IActionResult> DeleteRoleAsync([FromBody] ClaimDTO claimDTO)
        {
            var result = await _roleService.DeleteRoleClaims(claimDTO);

            if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result);
            else if (result.StatusCode.Equals(HttpStatusCode.NotFound))
                return NotFound(result);

            return Ok(result);
        }
    }
}
