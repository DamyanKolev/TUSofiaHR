using System.ComponentModel.DataAnnotations;

namespace webapi.Models.System
{
    public record SysPosition
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public required string NPKDBase { get; set; }
        [Required]
        public required string NPKDSlave { get; set; }
        [Required]
        public required string PositionName { get; set; }
    }
}
