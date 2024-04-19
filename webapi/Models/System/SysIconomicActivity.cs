using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace webapi.Models.System
{
    public class SysIconomicActivity
    {
        [Key]
        public int Id { get; set; }
        public required string NkidSector { get; set; }
        public required string NkidId { get; set; }
        public required string ActivityName { get; set; }
        public required string Nkid {  get; set; }
        public required decimal TzpbPercent {  get; set; }
    }
}
