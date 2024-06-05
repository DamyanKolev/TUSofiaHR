
using System.ComponentModel.DataAnnotations;

namespace webapi.Models.HR
{
    public record EndMonth {
        [Key]
        public int Id { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public bool IsFinished { get; set; }
        public DateOnly CreationDate { get; set; }
    }
        
}
