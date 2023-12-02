using System.ComponentModel.DataAnnotations;
using webapi.Models.System;

namespace webapi.Models.HR
{
    public class Address
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public required string StreetAddress { get; set; }
        [Required]
        public required string PostalCode { get; set; }
        [Required]
        public required SysAdministrativeTerritory Territory { get; set; }
    }
}
