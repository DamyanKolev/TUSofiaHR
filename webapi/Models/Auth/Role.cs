using Microsoft.AspNetCore.Identity;

namespace webapi.Models.Auth
{
    public class Role: IdentityRole<int>
    {
        override required public string Name {  get; set; }
        public required DateOnly CreatedAt { get; set; }
    }

    public record RoleRequest
    {
        public required string Name { get; set; }
    }

    public record ClaimRequest
    {
        public required string Name { get; set; }
        public required HashSet<string> Policies { get; set; }
    }
}
