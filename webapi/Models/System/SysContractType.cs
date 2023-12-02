using System.ComponentModel.DataAnnotations;

namespace webapi.Models.System
{
    public record SysContractType
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public required string Code { get; set; }
        [Required]
        public required string ContractType { get; set; }
    }
}
