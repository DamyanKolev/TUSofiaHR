using System.ComponentModel.DataAnnotations;

namespace webapi.Models.HR
{
    public class Company
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public required string CompanyName {  get; set; }
        [Required]
        public required string CompanyEIC { get; set; }
    }

    public struct CompanyInsertRequest
    {
        public string CompanyName { get; set; }
        public string CompanyEIC { get; set; }
    }

    public struct CompanyUpdate
    {
        public string CompanyName { get; set; }
        public string CompanyEIC { get; set; }
    }

    public struct CompanyUpdateRequest
    {
        public Int64 UpdateId { get; set; }
        public PersonalDataUpdate Data { get; set; }
    }
}
