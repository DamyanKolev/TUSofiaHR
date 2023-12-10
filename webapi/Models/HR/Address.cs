using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using webapi.Models.System;

namespace webapi.Models.HR
{
    public record Address
    {
        [Key]
        public int Id { get; set; }
        [NotNull]
        public required string StreetAddress { get; set; }
        [NotNull]
        public required string PostalCode { get; set; }
        [NotNull]
        public int TerritoryId { get; set; }
        public required SysAdministrativeTerritory Territory { get; set; }
    }


    public record AddressDTO
    {
        public required string StreetAddress { get; set; }
        public required string PostalCode { get; set; }
        public required int TerritoryId { get; set; }

    }


    public record AddressUpdateDTO
    {
        public required Int64 UpdateId { get; set; }
        public required AddressDTO Data { get; set; }
    }
}
