using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace webapi.Models.System
{
    public record SysPosition
    {
        [Key]
        public int Id { get; set; }
        [NotNull]
        public required string NpkdBase { get; set; }
        [NotNull]
        public required string NpkdId { get; set; }
        [NotNull]
        public required string NpkdSlave { get; set; }
        [NotNull]
        public required string PositionName { get; set; }
    }
}
