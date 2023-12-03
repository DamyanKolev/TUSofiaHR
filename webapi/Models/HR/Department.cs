using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.JsonPatch;

namespace webapi.Models.HR
{
    public record Department
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public required string DepartmentName { get; set; }
    }
}
