using Microsoft.AspNetCore.Identity;

namespace webapi.Models.Auth
{
    public class User : IdentityUser<int>
    {
        public override required string UserName { get; set; }
        public override required string PasswordHash { get; set; }
        public override required string Email {get; set;}
        public required string LoginSession { get; set; }
    }

    public struct UserRequest
    {
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
        public string Email { get; set; }
    }

    public struct UserUpdateRequest
    {
        public int Id { get; set; }
        public UserRequest UpdateData { get; set; }
    }

    public struct UserRoleRequest
    {
        public int UserId { get; set; }
        public string RoleName { get; set; }
    }
}
