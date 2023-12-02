using System.ComponentModel.DataAnnotations;

namespace webapi.Models.HR
{
    public class Position
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? PositionName { get; set; }
        [Required]
        public decimal? MinSalary { get; set; }
        [Required]
        public decimal? MaxSalary { get; set ; }
    }
}
