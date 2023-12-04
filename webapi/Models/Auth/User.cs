using Microsoft.AspNetCore.Identity;

namespace webapi.Models.Auth
{
    public class User : IdentityUser<int>
    {
        //public override required string UserName { get; set; }
        //public override required string PasswordHash { get; set; }
        //public override required string Email {get; set;}
    }

    public record UserDTO
    {
        public required string UserName { get; set; }
        public required string Password { get; set; }
        public required string Email { get; set; }
    }

    public record UserUpdateDTO
    {
        public required int Id { get; set; }
        public required UserDTO User { get; set; }
    }

    public record UserRoleDTO
    {
        public required string UserName { get; set; }
        public required string RoleName { get; set; }
    }
}
