using System.Net;
using System.Text;
using AutoMapper;
using HandlebarsDotNet;
using Newtonsoft.Json.Linq;
using PuppeteerSharp;
using webapi.Constants;
using webapi.Models;
using webapi.Models.Views;

namespace webapi.Services.References
{
    public interface IArticle62Service
    {
        public Task<byte[]> GetArticle62PDF();
        public byte[] GetArticle62CSV();
    }
    public class Article62Service : IArticle62Service
    {
        public readonly DatabaseContext _context;
        public readonly IMapper _mapper;

        public Article62Service(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }



        public async Task<byte[]> GetArticle62PDF()
        {
            var articles = _context.Article62V
                .Select(c => JObject.Parse(c.JsonObject))
                .ToList();
            //Initialize HTML to PDF converter. 


            var path = Path.Combine("Resources/Templates", "reference-article62.hbs");
            if (File.Exists(path))
            {
                string hbsTemplate = File.ReadAllText(path);
                var template = Handlebars.Compile(hbsTemplate);
                DateTime today = DateTime.Today;

                var data = new
                {
                    articles,
                    current_date = today
                };
                var result = template(data);
                Console.WriteLine(result);



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


        public byte[] GetArticle62CSV()
        {
            var articles = _context.Article62V
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
