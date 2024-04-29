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
        public Task<ResponseWithStatus<DataResponse<UserData>>> SingIn(LoginModel model);
        public Task<ResponseWithStatus<DataResponse<string>>> RefreshToken(string token);
    }

    public class AuthenticationService : IAuthenticationService
    {
        private readonly UserManager<User> _userManager;
        private readonly IJWTService _jwtService;
        public readonly DatabaseContext _context;

        public AuthenticationService(UserManager<User> userManager, IJWTService jwtService, DatabaseContext context)
        {
            _userManager = userManager;
            _jwtService = jwtService;
            _context = context;
        }

        public async Task<ResponseWithStatus<DataResponse<UserData>>> SingIn(LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);

            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var company = _context.Companies
                    .Where(c => c.UserId == user.Id)
                    .FirstOrDefault();

                if (company != null)
                {

                    var userRoles = await _userManager.GetRolesAsync(user);
                    string accessToken = _jwtService.GenerateAccessToken(user, userRoles);
                    string refreshToken = await _jwtService.GenerateRefreshToken(user);
                    AuthTokens authTokens = new AuthTokens
                    {
                        AccessToken = accessToken,
                        RefreshToken = refreshToken
                    };

                    company.User = null;
                    UserData userData = new UserData
                    {
                        Company = company,
                        Tokens = authTokens
                    };

                    return ResponseBuilder.CreateDataResponseWithStatus(
                        HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SIGN_IN, userData);
                }
            }

            return ResponseBuilder.CreateDataResponseWithStatus<UserData>(
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
