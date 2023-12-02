using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using webapi.Constants;
using webapi.Models;
using webapi.Models.Auth;

namespace webapi.Services.Auth
{
    public interface IAuthenticationService
    {
        public Task<ResponseWithStatus<DataResponse<string>>> SingIn(LoginModel model);
        public ResponseWithStatus<Response> ValidateToken(string token);

        public Task<ResponseWithStatus<DataResponse<string>>> RefreshToken(string token);
    }

    public class AuthenticationService : IAuthenticationService
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private readonly IJWTService _jwtService;

        public AuthenticationService(UserManager<User> userManager, IConfiguration configuration, IJWTService jwtService)
        {
            _userManager = userManager;
            _configuration = configuration;
            _jwtService = jwtService;
        }

        public async Task<ResponseWithStatus<DataResponse<string>>> SingIn(LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);

            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);
                string token = _jwtService.GenerateUserToken(user, userRoles);

                return ResponseBuilder.CreateDataResponseWithStatus<string>(
                    HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SIGN_IN, token);
            }

            return ResponseBuilder.CreateDataResponseWithStatus<string>(
                HttpStatusCode.BadRequest, MessageConstants.MESSAGE_FAILED_SIGN_IN, "");
        }


        public async Task<ResponseWithStatus<DataResponse<string>>> RefreshToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadJwtToken(token);

            var userName = jwtToken.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).FirstOrDefault();

            if (userName == null)
            {
                return ResponseBuilder.CreateDataResponseWithStatus<string>(
                    HttpStatusCode.BadRequest, MessageConstants.MESSAGE_REFRESH_TOKEN_FAILED, "");
            }

            var user = await _userManager.FindByNameAsync(userName.Value);

            if (user == null)
            {
                return ResponseBuilder.CreateDataResponseWithStatus<string>(
                    HttpStatusCode.BadRequest, MessageConstants.MESSAGE_REFRESH_TOKEN_FAILED, "");
            }

            var userRoles = await _userManager.GetRolesAsync(user);
            string newToken = _jwtService.GenerateUserToken(user, userRoles);

            return ResponseBuilder.CreateDataResponseWithStatus<string>(
                    HttpStatusCode.OK, MessageConstants.MESSAGE_REFRESH_TOKEN_SUCCESS, newToken);
        }


        public ResponseWithStatus<Response> ValidateToken(string token)
        {
            if (token == null)
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_NULL_TOKEN);

            var isTokenValid = _jwtService.IsTokenValid(token);

            if (!isTokenValid)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_INVALID_TOKEN);
            }

            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_VALID_TOKEN);
        }
    }
}
