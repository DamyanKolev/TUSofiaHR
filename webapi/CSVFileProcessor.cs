using CsvHelper.Configuration;
using CsvHelper;
using System.Globalization;

namespace webapi
{
    public static class CSVFileProcessor
    {
        public static IEnumerable<Т> ParseCSVToList<Т>(string fileName)
        {
            const string baseDir = "Resources\\";
            var filePath = Path.Combine(baseDir, fileName);

            var config = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                HasHeaderRecord = false,
            };
            using (var reader = new StreamReader(filePath))
            using (var csv = new CsvReader(reader, config))
            {
                var records = csv.GetRecords<Т>().ToList();
                csv.Dispose();

                return records;
            }

        }
    }
}
