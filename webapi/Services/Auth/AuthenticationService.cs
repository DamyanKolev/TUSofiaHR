using System.IdentityModel.Tokens.Jwt;
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
        public Task<DataResponse<string>> SingIn(LoginModel model);
        public Task<Response> Register(RegisterModel model);
    }

    public class AuthenticationService : IAuthenticationService
    {
        private readonly UserManager<User> userManager;
        private readonly RoleManager<Role> roleManager;
        private readonly IConfiguration _configuration;

        public AuthenticationService(UserManager<User> userManager, RoleManager<Role> roleManager, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _configuration = configuration;
        }

        public async Task<DataResponse<string>> SingIn(LoginModel model)
        {
            var user = await userManager.FindByNameAsync(model.Username);

            if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

                return new DataResponse<string>("OK", MessageConstants.MESSAGE_SUCCESS_SIGN_IN, tokenString);
            }

            return new DataResponse<string>("OK", MessageConstants.MESSAGE_SUCCESS_SIGN_IN, "Test");
        }


        public async Task<Response> Register(RegisterModel model)
        {
            var userExists = await userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return new Response("Error", MessageConstants.MESSAGE_USERNAME_EXIST);

            User user = new User()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                return new Response("Error", MessageConstants.MESSAGE_REGISTRATION_FAILED);
            }

            return new Response("OK", MessageConstants.MESSAGE_SUCCESS_REGISTRATION);
        }
    }
}
