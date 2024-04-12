using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using webapi.Constants;
using webapi.Models;
using webapi.Models.Auth;

namespace webapi.Services.Auth
{
    public interface IJWTService
    {
        public string GenerateAccessToken(User user, IList<string> userRoles);
        public Task<string> GenerateRefreshToken(User user);
        public Boolean IsTokenValid(string token);
    }

    public class JWTService : IJWTService
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;

        public JWTService(IConfiguration configuration, UserManager<User> userManager)
        {
            _configuration = configuration;
            _userManager = userManager;
        }


        public Boolean IsTokenValid(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]!);

            var validationResult = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true,
                ValidateAudience = true,
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            if (validatedToken == null)
            {
                return false;
            }

            var jwtToken = (JwtSecurityToken)validatedToken;
            var username = jwtToken.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value;

            if (username == null)
            {
                return false;
            }
            return true;
        }


        //Generate access token by user credentials and user Roles
        public string GenerateAccessToken(User user, IList<string> userRoles)
        {
            var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.UserName!),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            return GenerateToken(authClaims, 2);
        }


        public async Task<string> GenerateRefreshToken(User user)
        {
            var randomNumber = new byte[256];
            var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            var refreshHash = Convert.ToBase64String(randomNumber);
            var refreshClaim = new Claim(ClaimTypes.Hash, refreshHash);            

            var authClaims = new List<Claim>
            {
                refreshClaim,
                new Claim(ClaimTypes.NameIdentifier, user.UserName!),
            };
            await _userManager.AddClaimAsync(user, refreshClaim);

            return GenerateToken(authClaims, 24);
        }

        private string GenerateToken(IEnumerable<Claim> claims, int exprireTime)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]!));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _configuration["JWT:ValidIssuer"],
                Audience = _configuration["JWT:ValidAudience"],
                Expires = DateTime.UtcNow.AddHours(exprireTime),
                SigningCredentials = new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256),
                Subject = new ClaimsIdentity(claims)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
