using System.Collections.Generic;
using System.Reflection;

namespace webapi.Models
{
    public record FilterData
    {
        public required string FieldName { get; set; }
        public required string Value { get; set; }
    }
    public record Filter
    {
        public required string FieldName { get; set; }
        public required string Value { get; set; }
    }
}
