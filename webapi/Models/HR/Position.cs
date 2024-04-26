using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using webapi.Models.System;

namespace webapi.Models.HR
{
    public record Position
    {
        [Key]
        public int Id { get; set; }
        public required string PositionName { get; set; }
        public string? Description { get; set; }
        public int SysPositionId { get; set ; }
        public SysPosition? SysPosition { get; set ; }
    }

    public record PositionDTO
    {
        public required string PositionName { get; set; }
        public string? Description { get; set; }
        public int SysPositionId { get; set ; }
    }
}
