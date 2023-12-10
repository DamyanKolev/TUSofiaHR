using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace webapi.Models.System
{
    public record SysContractTerminationType
    {
        [Key]
        public int Id { get; set; }
        [NotNull]
        public required string Code { get; set; }
        [NotNull]
        public required string TerminationType { get; set; }
    }
}
