using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace webapi.Models.HR
{
    public record PersonalData
    {
        [Key]
        public int Id { get; set; }
        public required string IdentityText { get; set; }
        public int IdentityCode { get; set; }
        public Nullable<DateOnly> BirthDate { get; set; }
        public Nullable<Gender> Gender { get; set; }
        public string? PersonalIdNumber { get; set; }
        public Nullable<DateOnly> PersonalIdIssueDate { get; set; }
        public string? PersonalIdIssueBy { get; set; }
        public Nullable<int> AddressId { get; set; }
        public Address? Address { get; set; }
    }

    public record PersonalDataDTO
    {
        public required string IdentityText { get; set; }
        public int IdentityCode { get; set; }
        public Nullable<DateOnly> BirthDate { get; set; }
        public Nullable<Gender> Gender { get; set; }
        public string? PersonalIdNumber { get; set; }
        public Nullable<DateOnly> PersonalIdIssueDate { get; set; }
        public string? PersonalIdIssueBy { get; set; }
        public Nullable<int> AddressId { get; set; }
    }
}
