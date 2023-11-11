using Microsoft.AspNetCore.Identity;

namespace webapi.Models.Auth
{
    public class Role: IdentityRole
    {
        public string Name { get; set; }
        public DateOnly CreatedAt { get; set; }
        public DateOnly UpdatedAt { get; set; }
    }
}
