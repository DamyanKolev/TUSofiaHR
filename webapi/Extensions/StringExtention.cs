namespace webapi.Extensions
{
    public static class StringExtention
    {
        public static string FromPascalCaseToSnakeCase(this string str)
        {
            return string.IsNullOrWhiteSpace(str) ? str : string.Concat(str.Select((x, i) => i > 0 && char.IsUpper(x) ? "_" + x.ToString() : x.ToString())).ToLower();
        }
    }
}
