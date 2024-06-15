using webapi.Models.Views;
using webapi.Models;
using AutoMapper;
using HandlebarsDotNet;
using Newtonsoft.Json.Linq;
using PuppeteerSharp;
using System.Text;

namespace webapi.Services.References
{
    public interface IDeclaration1Service
    {
        public Task<byte[]> GetDeclaration1PDF();
        public byte[] GetDeclaration1CSV();
    }
    public class Declaration1Service: IDeclaration1Service
    {
        public readonly DatabaseContext _context;
        public readonly IMapper _mapper;

        public Declaration1Service(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        public async Task<byte[]> GetDeclaration1PDF()
        {
            var declarations = _context.Declaration1V
                .Select(c => JObject.Parse(c.JsonObject))
                .ToList();
            //Initialize HTML to PDF converter. 


            var path = Path.Combine("Resources/Templates", "declaration_1.hbs");
            if (File.Exists(path))
            {
                string hbsTemplate = File.ReadAllText(path);
                var template = Handlebars.Compile(hbsTemplate);
                DateTime today = DateTime.Today;

                var data = new
                {
                    declarations,
                    current_date = today
                };
                var result = template(data);


                using var browserFetcher = new BrowserFetcher();
                await browserFetcher.DownloadAsync();

                using (var browser = await Puppeteer.LaunchAsync(new LaunchOptions
                {
                    Headless = true,
                }))
                {
                    using (var page = await browser.NewPageAsync())
                    {
                        var pdfOptions = new PuppeteerSharp.PdfOptions();
                        pdfOptions.Landscape = true;


                        await page.SetContentAsync(result);
                        byte[] pdfBytes = await page.PdfDataAsync(pdfOptions);
                        return pdfBytes;
                    }
                }
            }
            return Encoding.ASCII.GetBytes("");
        }


        public byte[] GetDeclaration1CSV()
        {
            var articles = _context.Declaration1V
                .Select(c => c.CsvString)
                .ToList();

            using (var memoryStream = new MemoryStream())
            {
                using (var streamWriter = new StreamWriter(memoryStream, Encoding.UTF8))
                {
                    foreach (var csvString in articles)
                    {
                        streamWriter.WriteLine(csvString);
                    }
                }

                byte[] csvData = memoryStream.ToArray();

                return csvData;
            }
        }
    }
}
