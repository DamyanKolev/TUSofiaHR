using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models.HR
{
    public record Employee
    {
        [Key]
        public Int64 Id { get; set; }
        [Required, StringLength(100)]
        public required string FirstName { get; set; }
        [Required, StringLength(100)]
        public required string MiddleName {  get; set; }
        [Required, StringLength(100)]
        public required string Surname { get; set; }
        [Required, StringLength(15)]
        public required string PhoneNumber { get; set; }
        [Required]
        public required Int32 CompanyEmployeeId { get; set; }
        [Required]
        public required PersonalData PersonalData { get; set; }
        [ForeignKey("ManagerId")]
        public Employee? Manager { get; set; }
        [Required]
        public required Department Department { get; set; }
        [Required]
        public required Company Company { get; set; }
        public Position? Position { get; set; }
        public Int32 OldCompanyId { get; set; }
        public DateOnly DateOfComapanyChange { get; set; }
        public Boolean Article132Flag {  get; set; }
    }

    public record EmployeeInsertRequest
    {
        public required string FirstName { get; set; }
        public required string Surname { get; set;}
        public required string LastName { get; set;}
    }

    public record EmployeeUpdate
    {
        public required string FirstName { get; set; }
        public required string Surname { get; set; }
        public required string LastName { get; set; }
    }

    public record EmployeeUpdateRequest
    {
        public required Int64 UpdateId { get; set; }
        public required EmployeeUpdate Data { get; set; }
    }
}
