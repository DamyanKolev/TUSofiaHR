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
        public required string District { get; set; }
        [NotNull]
        public required string Municipilaty { get; set; }
        [NotNull]
        public required string Region { get; set; }
        [NotNull]
        public required string PopulatedPlace { get; set; }
    }


    public record AddressDTO
    {
        public required string StreetAddress { get; set; }
        public required string PostalCode { get; set; }
        public required string District { get; set; }
        public required string Municipilaty { get; set; }
        public required string Region { get; set; }
        public required string PopulatedPlace { get; set; }

    }


    public record AddressUpdateDTO
    {
        public required Int64 UpdateId { get; set; }
        public required AddressDTO Data { get; set; }
    }
}
