using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models.HR
{
    public class Employee
    {
        [Key]
        public Int64 Id { get; set; }
        [Required, StringLength(100)]
        public string? FirstName { get; set; }
        [Required, StringLength(100)]
        public string? MiddleName {  get; set; }
        [Required, StringLength(100)]
        public string? Surname { get; set; }
        [Required, StringLength(15)]
        public string? PhoneNumber { get; set; }
        [Required]
        public Int32? CompanyEmployeeId { get; set; }
        [Required]
        public PersonalData? PersonalData { get; set; }
        [ForeignKey("ManagerId")]
        public Employee Manager { get; set; }
        [Required]
        public Department? Department { get; set; }
        [Required]
        public Company? Company { get; set; }
        public Position Position { get; set; }
        public Int32 OldCompanyId { get; set; }
        public DateOnly DateOfComapanyChange { get; set; }
        public Boolean Article132Flag {  get; set; }
    }

    public struct EmployeeInsertRequest
    {
        public string FirstName { get; set; }
        public string Surname { get; set;}
        public string LastName { get; set;}
    }

    public struct EmployeeUpdate
    {
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string LastName { get; set; }
    }

    public struct EmployeeUpdateRequest
    {
        public Int64 UpdateId { get; set; }
        public EmployeeUpdate Data { get; set; }
    }
}
