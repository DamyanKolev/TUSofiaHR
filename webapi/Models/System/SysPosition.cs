using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace webapi.Models.System
{
    public record SysPosition
    {
        [Key]
        public int Id { get; set; }
        public required string PositionName { get; set; }
        public required string Nkpd { get; set; }
    }
}
