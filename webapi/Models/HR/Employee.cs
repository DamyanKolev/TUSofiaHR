using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models.HR
{
    public record Employee
    {
        [Key]
        public int Id { get; set; }
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

        public int DepartmentTeamId { get; set; }
        public DepartmentTeam? DepartmentTeam { get; set; }


        public Nullable<int> PositionId { get; set; }
        public Position? Position { get; set; }


        public Nullable<int> InsuranceId { get; set; }
        public Insurance? Insurance { get; set; }
    }

    public record EmployeeDTO
    {
        public required string FirstName { get; set; }
        public required string MiddleName { get; set; }
        public required string Surname { get; set; }
        public required string Email { get; set; }
        public required string PhoneNumber { get; set; }
        public int CompanyEmployeeId { get; set; }
        public int PersonalDataId { get; set; }
        public int DepartmentTeamId { get; set; }
        public Nullable<int> PositionId { get; set; }
        public Nullable<int> InsuranceId { get; set; }
    }
}
