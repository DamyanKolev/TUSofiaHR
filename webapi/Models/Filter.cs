using System.Collections.Generic;
using System.Reflection;

namespace webapi.Models
{
    public struct FilterData
    {
        public string FieldName { get; set; }
        public string FilterType { get; set; }
        public string Value { get; set; }
        public bool IsOr {  get; set; }
    }
    public class Filter
    {

    }
}
