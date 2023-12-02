using System.ComponentModel.DataAnnotations;

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
        public string? PositionName { get; set; }
        public decimal MinSalary { get; set; }
        public decimal MaxSalary { get; set; }
    }

    public record PositionUpdateRequest
    {
        public required int PositionId { get; set; }
        public required PositionDTO PositionRequest { get; set; }
    }
}
