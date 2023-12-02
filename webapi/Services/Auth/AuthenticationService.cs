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

        public AuthenticationService(UserManager<User> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<ResponseWithStatus<DataResponse<string>>> SingIn(LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);

            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                string token = await GenerateUserToken(user);

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

            var newToken = await GenerateUserToken(user);

            return ResponseBuilder.CreateDataResponseWithStatus<string>(
                    HttpStatusCode.OK, MessageConstants.MESSAGE_REFRESH_TOKEN_SUCCESS, newToken);
        }


        public ResponseWithStatus<Response> ValidateToken(string token)
        {
            if (token == null)
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_NULL_TOKEN);

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]!);

            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var username = jwtToken.Claims.First(x => x.Type == ClaimTypes.Name).Value;


                if (username == null)
                {
                    return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_INVALID_TOKEN);
                }
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_VALID_TOKEN);
            }
            catch
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_INVALID_TOKEN);

            }
        }

        private string GenerateToken(IEnumerable<Claim> claims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]!));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _configuration["JWT:ValidIssuer"],
                Audience = _configuration["JWT:ValidAudience"],
                Expires = DateTime.UtcNow.AddHours(3),
                SigningCredentials = new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256),
                Subject = new ClaimsIdentity(claims)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private async Task<string> GenerateUserToken(User user)
        {
            var userRoles = await _userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.UserName!),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }
            
            return GenerateToken(authClaims);
        }
    }
}
