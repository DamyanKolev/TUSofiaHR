using System.Net;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using webapi.Constants;
using webapi.Models;
using webapi.Models.Auth;

namespace webapi.Services.Auth
{
    public interface IRoleService
    {
        public Task<ResponseWithStatus<Response>> CreateRoleAsync(RoleRequest roleRequest);
        public Task<ResponseWithStatus<Response>> UpdateRoleAsync(RoleRequest updateRequest);
    }

    public class RoleService : IRoleService
    {
        private readonly RoleManager<Role> _roleManager;
        public RoleService(RoleManager<Role> roleManager)
        {
            _roleManager = roleManager;
        }

        public async Task<ResponseWithStatus<Response>> CreateRoleAsync(RoleRequest roleRequest) {
            // Create the role object
            Role role = new Role();
            role.Name = roleRequest.Name;
            role.CreatedAt = DateOnly.FromDateTime(DateTime.Now);

            // Add the role to the database
            var createdRole = await _roleManager.CreateAsync(role);

            if (!createdRole.Succeeded)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_INSERT_FAILED);
            }

            foreach (var policy in roleRequest.Policies)
            {
                var claimResult = await _roleManager.AddClaimAsync(role, new Claim(policy, "true"));
                if (!claimResult.Succeeded)
                {
                    return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_CREATE_CLAIM_FAILED);
                }
            }

            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_INSERT_SUCCESS);
        }


        public async Task<ResponseWithStatus<Response>> UpdateRoleAsync(RoleRequest updateRequest)
        {
            var role = _roleManager.Roles.FirstOrDefault(x => x.Name == updateRequest.Name);

            if (role == null)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.NotFound, MessageConstants.MESSAGE_RECORD_NOT_FOUND);
            }

            var roleClaims = await _roleManager.GetClaimsAsync(role);

            foreach (var policy in updateRequest.Policies)
            {
                Claim newClaim = new Claim(policy, "true");
                if (!roleClaims.Contains(newClaim))
                {
                    var claimResult = await _roleManager.AddClaimAsync(role, new Claim(policy, "true"));
                    if (!claimResult.Succeeded)
                    {
                        return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_CREATE_CLAIM_FAILED);
                    }
                }
            }
            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_UPDATE_SUCCESS);
        }
    }
}
