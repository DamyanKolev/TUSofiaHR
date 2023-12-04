using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.JsonPatch;

namespace webapi.Models.HR
{
    public record Company
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public required string CompanyName {  get; set; }
        [Required]
        public required string CompanyEIC { get; set; }
    }

    public record CompanyDTO
    {
        public string? CompanyName { get; set; }
        public string? CompanyEIC { get; set; }
    }

    public record CompanyUpdateDTO
    {
        public required Int64 UpdateId { get; set; }
        public required JsonPatchDocument<CompanyDTO> Company { get; set; }
    }
}
