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

    public record CompanyRequest
    {
        public required string CompanyName { get; set; }
        public required string CompanyEIC { get; set; }
    }

    public record CompanyUpdateRequest
    {
        public required Int64 UpdateId { get; set; }
        public required CompanyRequest CompanyRequest { get; set; }
    }
}
