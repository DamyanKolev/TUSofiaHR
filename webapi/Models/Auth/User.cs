using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace webapi.Models.Auth
{
    public class User: IdentityUser
    {
        [Required]
        [Key]
        public Int64 Id { get; set; }

        [Required]
        [MinLength(10), MaxLength(50)]
        public string Username { get; set; }

        [Required]
        [StringLength(100)]
        public string Password { get; set; }

        [Required]
        [StringLength(100)]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string LoginSession { get; set; }
    }
}
