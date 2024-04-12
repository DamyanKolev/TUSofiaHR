using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;
using webapi.Constants;
using webapi.Extensions;
using webapi.Models;
using webapi.Models.Auth;

namespace webapi.Services.Auth
{
    public interface IJWTService
    {
        public string GenerateAccessToken(User user, IList<string> userRoles);
        public Task<string> GenerateRefreshToken(User user);
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

            await _userManager.AddUpdateClaim(user, refreshClaim);
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
