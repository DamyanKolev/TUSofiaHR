using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.JsonPatch;

namespace webapi.Models.HR
{
    public record Position
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public required string PositionName { get; set; }
        [Required]
        public required decimal MinSalary { get; set; }
        [Required]
        public required decimal MaxSalary { get; set ; }
    }

    public record PositionDTO
    {
        public required string PositionName { get; set; }
        public decimal MinSalary { get; set; }
        public decimal MaxSalary { get; set; }
    }

    public record PositionUpdateDTO
    {
        public required int PositionId { get; set; }
        public required JsonPatchDocument<PositionDTO> Position { get; set; }
    }
}
