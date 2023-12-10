using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.JsonPatch;

namespace webapi.Models.HR
{
    public record Position
    {
        [Key]
        public int Id { get; set; }
        [NotNull]
        public required string PositionName { get; set; }
        [NotNull]
        public required decimal MinSalary { get; set; }
        [NotNull]
        public required decimal MaxSalary { get; set ; }
    }

    public record PositionDTO
    {
        public required string PositionName { get; set; }
        public required decimal MinSalary { get; set; }
        public required decimal MaxSalary { get; set; }
    }

    public record PositionUpdateDTO
    {
        public required int PositionId { get; set; }
        public required JsonPatchDocument<PositionDTO> Position { get; set; }
    }
}
