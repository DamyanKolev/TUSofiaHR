using System.ComponentModel.DataAnnotations;

namespace webapi.Models.HR
{
    public class Employee
    {
        [Key]
        [Required]
        public Int64 Id { get; set; }

        [Required]
        [StringLength(100)]
        public required string FirstName { get; set; }

        [Required]
        [StringLength(100)]
        public required string Surname {  get; set; }

        [Required]
        [StringLength(100)]
        public required string LastName { get; set; }
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
