using System.Net;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using System.Security.Cryptography;
using webapi.Constants;
using webapi.Models;
using webapi.Models.Auth;

namespace webapi.Services.Auth
{
    public interface IUserService
    {
        public Task<ResponseWithStatus<Response>> CreateUserAsync(UserRequest userRequest);
        public Task<ResponseWithStatus<Response>> UpdateUserAsync(UserUpdateRequest updateRequest);
        public Task<ResponseWithStatus<Response>> AddUserRole(UserRoleRequest userRoleRequest);
    }

    public class UserService: IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        public readonly IMapper _mapper;
        public UserService(UserManager<User> userManager, IMapper mapper, RoleManager<Role> roleManager) {
            _userManager = userManager;
            _mapper = mapper;
            _roleManager = roleManager;
        }

        public async Task<ResponseWithStatus<Response>> CreateUserAsync(UserRequest userRequest)
        {
            var userExists = await _userManager.FindByNameAsync(userRequest.UserName);

            if (userExists != null)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.Conflict, MessageConstants.MESSAGE_USERNAME_EXIST);
            }

            User user = new User() { 
                Email= userRequest.Email, 
                UserName= userRequest.UserName
            };

            var result = await _userManager.CreateAsync(user, userRequest.Password);

            if (!result.Succeeded)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, result.Errors.ToString());
            }
            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_REGISTRATION);
        }


        public async Task<ResponseWithStatus<Response>> UpdateUserAsync(UserUpdateRequest updateRequest)
        {
            var user = await _userManager.FindByIdAsync(updateRequest.Id.ToString());

            if (user == null)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.NotFound, MessageConstants.MESSAGE_RECORD_NOT_FOUND);
            }

            _mapper.Map(updateRequest.UpdateData, user);
            var result = await _userManager.UpdateAsync(user);

            if(!result.Succeeded)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_UPDATE_FAILED);
            }
            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_UPDATE_SUCCESS);
        }

        public async Task<ResponseWithStatus<Response>> AddUserRole(UserRoleRequest userRoleRequest)
        {
            var user = await _userManager.FindByNameAsync(userRoleRequest.UserName);
            var role = await _roleManager.FindByNameAsync(userRoleRequest.RoleName);

            if (user == null)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.NotFound, MessageConstants.MESSAGE_USER_NOT_FOUND);
            }

            if (role == null)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.NotFound, MessageConstants.MESSAGE_ROLE_NOT_FOUND);
            }

            var result = await _userManager.AddToRoleAsync(user, userRoleRequest.RoleName);

            if (!result.Succeeded)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_FAILED_ADD_USER_ROLE);
            }
            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_ADD_USER_ROLE);
        }
    }
}
