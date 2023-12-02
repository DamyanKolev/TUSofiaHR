using System.ComponentModel.DataAnnotations;

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

    public record CompanyUpdateRequest
    {
        public required Int64 UpdateId { get; set; }
        public required CompanyDTO CompanyRequest { get; set; }
    }
}
