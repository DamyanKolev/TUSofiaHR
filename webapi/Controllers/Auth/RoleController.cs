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
        public async Task<IActionResult> CreateRoleAsync([FromBody] RoleRequest roleRequest)
        {
            var result = await _roleService.CreateRoleAsync(roleRequest);

            if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result);

            return Ok(result);
        }



        [HttpPost("/api/auth/role-claims/create", Name = "Create_Role_Claims")]
        public async Task<IActionResult> UpdateRoleAsync([FromBody] ClaimRequest claimRequest)
        {
            var result = await _roleService.CreateRoleClaimsAsync(claimRequest);

            if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result);
            else if (result.StatusCode.Equals(HttpStatusCode.NotFound))
                return NotFound(result);

            return Ok(result);
        }



        [HttpDelete("/api/auth/role-claims/delete", Name = "Delete_Role_Claims")]
        public async Task<IActionResult> DeleteRoleAsync([FromBody] ClaimRequest claimRequest)
        {
            var result = await _roleService.DeleteRoleClaimsAsync(claimRequest);

            if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result);
            else if (result.StatusCode.Equals(HttpStatusCode.NotFound))
                return NotFound(result);

            return Ok(result);
        }
    }
}
