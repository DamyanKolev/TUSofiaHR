using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using webapi.Models.Auth;

namespace webapi.Extensions
{
    public static class UserManagerExtensions
    {
        public async static Task AddUpdateClaim(this UserManager<User> userManager, User user, Claim newClaim)
        {
            var claims = await userManager.GetClaimsAsync(user);
            var claim = claims.Where(c => c.Type == newClaim.Type).FirstOrDefault();

            if (claim != null)
            {
                await userManager.RemoveClaimAsync(user, claim);
            }
            await userManager.AddClaimAsync(user, newClaim);
        }
    }
}
