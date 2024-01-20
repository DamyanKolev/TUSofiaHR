using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace webapi.Models.HR
{
    public record Company
    {
        [Key]
        public int Id { get; set; }
        [NotNull]
        public required string CompanyName {  get; set; }
        [NotNull]
        public required string CompanyEIC { get; set; }
    }

    public record CompanyDTO
    {
        public required string CompanyName { get; set; }
        public required string CompanyEIC { get; set; }
    }
}
