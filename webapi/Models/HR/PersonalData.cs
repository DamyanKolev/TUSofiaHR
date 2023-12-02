using System.ComponentModel.DataAnnotations;

namespace webapi.Models.HR
{
    public class PersonalData
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public required string EGN { get; set; }
        public DateOnly BirthDate { get; set; }
        public Gender Gender { get; set; }
        public DateOnly PersonalIdIssueDate { get; set; }
        public Address? Address { get; set; }
    }

    public struct PersonalDataInsertRequest
    {
        public string EGN { get; set; }
    }

    public struct PersonalDataUpdate
    {
        public string EGN { get; set; }
    }

    public struct PersonalDataUpdateRequest
    {
        public Int64 UpdateId { get; set; }
        public PersonalDataUpdate Data { get; set; }
    }
}
