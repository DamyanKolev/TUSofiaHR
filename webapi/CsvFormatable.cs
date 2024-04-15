using System.Reflection;
using System.Text;

namespace webapi
{
    public abstract class CsvFormatable
    {
        public string ToCsvString()
        {
            // fields type
            Type type = GetType();
            FieldInfo[] fields = type.GetFields();

            // Building a CSV string
            StringBuilder csvBuilder = new StringBuilder();
            foreach (FieldInfo field in fields)
            {
                var value = field.GetValue(this);
                if (value != null)
                {
                    csvBuilder.Append($"{value},");
                }
                else
                {
                    csvBuilder.Append($",");
                }
            }

            // Remove last comma
            csvBuilder.Length -= 1;

            return csvBuilder.ToString();
        }
    }
}
