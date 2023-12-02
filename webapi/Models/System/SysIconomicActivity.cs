using System.ComponentModel.DataAnnotations;

namespace webapi.Models.System
{
    public class SysIconomicActivity
    {
        [Key]
        public int Id { get; set; }
        [Required]  
        public required string Nkid { get; set; }
        [Required]  
        public required string NkidIdText { get; set; }
        [Required]  
        public required string ActivityName { get; set; }
        [Required]  
        public required string NkidId {  get; set; }
    }
}
