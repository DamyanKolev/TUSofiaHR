using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace webapi.Models.HR
{
    public class EmployeeContracts
    {
        [Key]
        public long Id { get; set; }
        public long EmployeeId { get; set; }
        public Employee? Employee { get; set; }
        public long ContractId { get; set; }
        public Contract? Contract { get; set; }
        public bool IsActive { get; set; }
    }

    public record EmployeeContractInsert
    {
        public required long EmployeeId { get; set; }
        public required ContractDTO Contract { get; set; }
    }
}
