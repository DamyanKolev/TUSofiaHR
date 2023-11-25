using Microsoft.AspNetCore.Identity;

namespace webapi.Models.Auth
{
    public class User : IdentityUser<int>
    {
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
        public string Email {get; set;}
        public string LoginSession { get; set; }
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
}
