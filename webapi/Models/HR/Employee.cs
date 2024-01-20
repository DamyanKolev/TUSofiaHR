using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models.HR
{
    public record Employee
    {
        [Key]
        public Int64 Id { get; set; }
        [StringLength(100)]
        public required string FirstName { get; set; }
        [StringLength(100)]
        public required string MiddleName {  get; set; }
        [StringLength(100)]
        public required string Surname { get; set; }
        [EmailAddress]
        public required string Email { get; set; }
        [StringLength(15)]
        public required string PhoneNumber { get; set; }
        public required Int32 CompanyEmployeeId { get; set; }


        public int PersonalDataId { get; set; }
        public PersonalData? PersonalData { get; set; }


        public long? ManagerId { get; set; }
        public Employee? Manager { get; set; }


        public int DepartmentId { get; set; }
        public Department? Department { get; set; }


        public int CompanyId { get; set; }
        public Company? Company { get; set; }


        public int PositionId { get; set; }
        public Position? Position { get; set; }


        public Int32? OldCompanyId { get; set; }
        public DateOnly? DateOfComapanyChange { get; set; }
        [Column("article123_flag")]
        public Boolean? Article132Flag {  get; set; }
    }

    public record EmployeeDTO
    {
        public required string FirstName { get; set; }
        public required string MiddleName { get; set; }
        public required string Surname { get; set; }
        
        public required string Email { get; set; }
        public required string PhoneNumber { get; set; }
        public Int32 CompanyEmployeeId { get; set; }
        public int? PersonalDataId { get; set; }
        public int? ManagerId { get; set; }
        public int? DepartmentId { get; set; }
        public int? CompanyId { get; set; }
        public int? PositionId { get; set; }
        public Int32? OldCompanyId { get; set; }
        public DateOnly? DateOfComapanyChange { get; set; }
        public Boolean Article132Flag { get; set; }
    }
}
