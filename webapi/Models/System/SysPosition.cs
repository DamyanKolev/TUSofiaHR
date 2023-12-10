using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace webapi.Models.System
{
    public record SysPosition
    {
        [Key]
        public int Id { get; set; }
        [NotNull]
        public required string NPKDBase { get; set; }
        [NotNull]
        public required string NPKDId { get; set; }
        [NotNull]
        public required string NPKDSlave { get; set; }
        [NotNull]
        public required string PositionName { get; set; }
    }
}
