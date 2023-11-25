using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace webapi.Models.Auth
{
    public class User: IdentityUser
    {
        public string UserName {  get; set; }
        public string PasswordHash {  get; set; }
        public string Email { get; set; }
        public string LoginSession { get; set; }
    }
}
