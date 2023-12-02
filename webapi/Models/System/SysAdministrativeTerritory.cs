using System.ComponentModel.DataAnnotations;

namespace webapi.Models.System
{
    public record SysAdministrativeTerritory
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public required string Ekatte { get; set; }
        [Required]
        public required string TerritoryName { get; set; }
        [Required]
        public required string TerritoryType { get; set; }
        [Required]
        public required string RegionName { get; set; }
        [Required]
        public required string MunicipalityName { get; set; }
    }
}
