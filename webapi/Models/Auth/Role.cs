using Microsoft.AspNetCore.Identity;

namespace webapi.Models.Auth
{
    public class Role: IdentityRole<int>
    {
        override required public string Name {  get; set; }
        public required DateOnly CreatedAt { get; set; }
    }

    public struct RoleRequest
    {
        public string Name { get; set; }
    }

    public struct ClaimRequest
    {
        public string Name { get; set; }
        public HashSet<string> Policies { get; set; }
    }
}
