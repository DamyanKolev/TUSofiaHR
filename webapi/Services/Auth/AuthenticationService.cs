using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using webapi.Constants;
using webapi.Models;
using webapi.Models.Auth;

namespace webapi.Services.Auth
{
    public interface IAuthenticationService
    {
        public Task<ResponseWithStatus<DataResponse<AuthTokens>>> SingIn(LoginModel model);
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

        public async Task<ResponseWithStatus<DataResponse<AuthTokens>>> SingIn(LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);

            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);
                string accessToken = _jwtService.GenerateAccessToken(user, userRoles);
                string refreshToken = await _jwtService.GenerateRefreshToken(user);
                AuthTokens authTokens = new AuthTokens {
                    AccessToken = accessToken,
                    RefreshToken = refreshToken
                };

                return ResponseBuilder.CreateDataResponseWithStatus(
                    HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SIGN_IN, authTokens);
            }

            return ResponseBuilder.CreateDataResponseWithStatus<AuthTokens>(
                HttpStatusCode.BadRequest, MessageConstants.MESSAGE_FAILED_SIGN_IN, null!);
        }


        public async Task<ResponseWithStatus<DataResponse<string>>> RefreshToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadJwtToken(token);

            var userName = jwtToken.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).FirstOrDefault();
            var tokenHash = jwtToken.Claims.Where(c => c.Type == ClaimTypes.Hash).FirstOrDefault();

            if (userName == null || tokenHash == null) {
                return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_REFRESH_TOKEN_FAILED, "");
            }
            var user = await _userManager.FindByNameAsync(userName.Value);


            if (user == null) {
                return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_REFRESH_TOKEN_FAILED, "");
            }
            var userHashes = await _userManager.GetClaimsAsync(user);
            var userHash = userHashes.Where(c => c.Type == ClaimTypes.Hash).FirstOrDefault();


            if (String.Equals(userHash!.Value, tokenHash.Value)) {
                return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_REFRESH_TOKEN_FAILED, "");
            }

            var userRoles = await _userManager.GetRolesAsync(user);
            string newToken = _jwtService.GenerateAccessToken(user, userRoles);
            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_REFRESH_TOKEN_SUCCESS, newToken);
        }
    }
}
