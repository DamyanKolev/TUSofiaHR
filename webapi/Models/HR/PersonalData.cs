using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace webapi.Models.HR
{
    public record PersonalData
    {
        [Key]
        public int Id { get; set; }
        [NotNull]
        public required string EGN { get; set; }
        public DateOnly? BirthDate { get; set; }
        public Gender? Gender { get; set; }
        public string? PersonalIdNumber { get; set; }
        public DateOnly? PersonalIdIssueDate { get; set; }
        public string? PersonalIdIssueBy { get; set; }
        public Address? Address { get; set; }
    }

    public record PersonalDataDTO
    {
        public required string EGN { get; set; }
        public DateOnly BirthDate { get; set; }
        public Gender Gender { get; set; }
        public string? PersonalIdNumber { get; set; }
        public DateOnly PersonalIdIssueDate { get; set; }
        public string? PersonalIdIssueBy { get; set; }
        public Address? Address { get; set; }
    }


    public record PersonalDataUpdateDTO
    {
        public required Int64 UpdateId { get; set; }
        public required PersonalDataDTO PersonalData { get; set; }
    }
}
