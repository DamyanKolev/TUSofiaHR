using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace webapi.Models.System
{
    public class SysIconomicActivity
    {
        [Key]
        public int Id { get; set; }
        [NotNull]  
        public required string Nkid { get; set; }
        [NotNull]  
        public required string NkidIdText { get; set; }
        [NotNull]  
        public required string ActivityName { get; set; }
        [NotNull]  
        public required string NkidId {  get; set; }
    }
}
