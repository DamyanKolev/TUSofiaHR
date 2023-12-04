using System.Net;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using webapi.Constants;
using webapi.Models;
using webapi.Models.Auth;

namespace webapi.Services.Auth
{
    public interface IUserService
    {
        public Task<ResponseWithStatus<Response>> CreateUser(UserDTO userRequest);
        public Task<ResponseWithStatus<Response>> UpdateUser(UserUpdateDTO updateRequest);
        public Task<ResponseWithStatus<Response>> AddUserRole(UserRoleDTO userRoleRequest);
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

        public async Task<ResponseWithStatus<Response>> CreateUser(UserDTO userDTO)
        {
            var userExists = await _userManager.FindByNameAsync(userDTO.UserName);

            if (userExists != null)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.Conflict, MessageConstants.MESSAGE_USERNAME_EXIST);
            }

            User user = new User() { 
                Email= userDTO.Email, 
                UserName= userDTO.UserName
            };

            var result = await _userManager.CreateAsync(user, userDTO.Password);

            if (!result.Succeeded)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_FAILED_REGISTRATION);
            }
            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_REGISTRATION);
        }


        public async Task<ResponseWithStatus<Response>> UpdateUser(UserUpdateDTO updateDTO)
        {
            var user = await _userManager.FindByIdAsync(updateDTO.Id.ToString());

            if (user == null)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.NotFound, MessageConstants.MESSAGE_RECORD_NOT_FOUND);
            }

            _mapper.Map(updateDTO.User, user);
            var result = await _userManager.UpdateAsync(user);

            if(!result.Succeeded)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_UPDATE_FAILED);
            }
            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_UPDATE_SUCCESS);
        }


        public async Task<ResponseWithStatus<Response>> AddUserRole(UserRoleDTO userRoleDTO)
        {
            var user = await _userManager.FindByNameAsync(userRoleDTO.UserName);
            var role = await _roleManager.FindByNameAsync(userRoleDTO.RoleName);

            if (user == null)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.NotFound, MessageConstants.MESSAGE_USER_NOT_FOUND);
            }

            if (role == null)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.NotFound, MessageConstants.MESSAGE_ROLE_NOT_FOUND);
            }

            var result = await _userManager.AddToRoleAsync(user, userRoleDTO.RoleName);

            if (!result.Succeeded)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_FAILED_ADD_USER_ROLE);
            }
            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_ADD_USER_ROLE);
        }
    }
}
