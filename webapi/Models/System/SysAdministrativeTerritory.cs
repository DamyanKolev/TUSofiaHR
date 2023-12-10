using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace webapi.Models.System
{
    public record SysAdministrativeTerritory
    {
        [Key]
        public int Id { get; set; }
        [NotNull]
        public required string Ekatte { get; set; }
        [NotNull]
        public required string TerritoryName { get; set; }
        [NotNull]
        public required string TerritoryType { get; set; }
        [NotNull]
        public required string RegionName { get; set; }
        [NotNull]
        public required string MunicipalityName { get; set; }
    }
}
