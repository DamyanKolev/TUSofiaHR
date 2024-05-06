﻿using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models.Views
{
    public class Declaration6V
    {
        [Column(TypeName = "jsonb")]
        public required string JsonObject { get; set; }
        public required string CsvString { get; set; }
    }
}
