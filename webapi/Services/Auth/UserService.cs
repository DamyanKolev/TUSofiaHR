using System.Net;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using webapi.Constants;
using webapi.Models;
using webapi.Models.Auth;

namespace webapi.Services.Auth
{
    public interface IUserService
    {
        public Task<ResponseWithStatus<Response>> CreateUserAsync(UserRequest userRequest);
        public Task<ResponseWithStatus<Response>> UpdateUserAsync(UserUpdateRequest updateRequest);
    }

    public class UserService
    {
        private readonly UserManager<User> _userManager;
        public readonly IMapper _mapper;
        public UserService(UserManager<User> userManager, IMapper mapper) {
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<ResponseWithStatus<Response>> CreateUserAsync(UserRequest userRequest)
        {
            var userExists = await _userManager.FindByNameAsync(userRequest.UserName);

            if (userExists != null)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.Conflict, MessageConstants.MESSAGE_USERNAME_EXIST);
            }

            User user = _mapper.Map<User>(userRequest);
            user.SecurityStamp = Guid.NewGuid().ToString();

            var result = await _userManager.CreateAsync(user);

            if (!result.Succeeded)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_REGISTRATION_FAILED);
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
    }
}
