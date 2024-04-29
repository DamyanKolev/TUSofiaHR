using System.ComponentModel.DataAnnotations;

namespace webapi.Models.HR
{
    public class EmployeeContracts
    {
        [Key]
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public Employee? Employee { get; set; }
        public int ContractId { get; set; }
        public Contract? Contract { get; set; }
        public bool IsActive { get; set; }
    }

    public record EmployeeContractInsert
    {
        public required int EmployeeId { get; set; }
        public required ContractDTO Contract { get; set; }
    }
}
