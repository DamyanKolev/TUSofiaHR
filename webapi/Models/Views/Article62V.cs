using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace webapi.Models.Views
{
    public class Article62V
    {
        [Column(TypeName = "jsonb")]
        public required string JsonObject { get; set; }
        public required string CsvString { get; set; }
    }
}
