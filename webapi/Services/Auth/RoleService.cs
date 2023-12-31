﻿using System.Net;
using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using webapi.Constants;
using webapi.Models;
using webapi.Models.Auth;

namespace webapi.Services.Auth
{
    public interface IRoleService
    {
        public Task<ResponseWithStatus<Response>> CreateRole(RoleDTO roleDTO);
        public Task<ResponseWithStatus<Response>> CreateRoleClaims(ClaimDTO claimDTO);
        public Task<ResponseWithStatus<Response>> DeleteRoleClaims(ClaimDTO ClaimDTO);
    }

    public class RoleService : IRoleService
    {
        private readonly RoleManager<Role> _roleManager;
        public readonly IMapper _mapper;
        public RoleService(RoleManager<Role> roleManager, IMapper mapper)
        {
            _roleManager = roleManager;
            _mapper = mapper;
        }

        public async Task<ResponseWithStatus<Response>> CreateRole(RoleDTO roleDTO) {
            // Create the role object
            var role = _mapper.Map<Role>(roleDTO);
            role.CreatedAt = DateOnly.FromDateTime(DateTime.Now);
            // Add the role to the database
            var result = await _roleManager.CreateAsync(role);

            if (!result.Succeeded)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_INSERT_FAILED);
            }

            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_INSERT_SUCCESS);
        }


        public async Task<ResponseWithStatus<Response>> CreateRoleClaims(ClaimDTO claimDTO)
        {
            var role = _roleManager.Roles.FirstOrDefault(x => x.Name == claimDTO.Name);

            if (role == null)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.NotFound, MessageConstants.MESSAGE_RECORD_NOT_FOUND);
            }

            var roleClaims = await _roleManager.GetClaimsAsync(role);
            foreach (var policy in claimDTO.Policies)
            {
                Claim newClaim = new Claim(policy,  "true");
                if (!roleClaims.Contains(newClaim))
                {
                    var claimResult = await _roleManager.AddClaimAsync(role, new Claim(policy, "true"));
                    if (!claimResult.Succeeded)
                    {
                        return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_CREATE_CLAIM_FAILED);
                    }
                }
            }
            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_INSERT_SUCCESS);
        }


        public async Task<ResponseWithStatus<Response>> DeleteRoleClaims(ClaimDTO claimDTO)
        {
            var role = _roleManager.Roles.FirstOrDefault(x => x.Name == claimDTO.Name);

            if (role == null)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.NotFound, MessageConstants.MESSAGE_RECORD_NOT_FOUND);
            }

            var roleClaims = await _roleManager.GetClaimsAsync(role);

            foreach (var policy in claimDTO.Policies)
            {
                var claim = roleClaims.FirstOrDefault(x => x.Type == policy);

                if (claim == null)
                {
                    return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.NotFound, MessageConstants.MESSAGE_RECORD_NOT_FOUND);
                }

                var result = await _roleManager.RemoveClaimAsync(role, claim);
                if (!result.Succeeded)
                {
                    return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_UPDATE_FAILED);
                }
            }
            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_UPDATE_SUCCESS);
        }
    }
}
