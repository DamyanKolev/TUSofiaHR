using System.Net;
using System.Text;
using AutoMapper;
using HandlebarsDotNet;
using Newtonsoft.Json.Linq;
using PuppeteerSharp;
using webapi.Constants;
using webapi.Models;


namespace webapi.Services.References
{
    public interface IArticle62Service
    {
        public Task<byte[]> GetArticle62PDF();
        public byte[] GetArticle62CSV();
        public ResponseWithStatus<DataResponse<Boolean>> IsHaveArticle62Documents();
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
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                byte[] pdfBytes = Encoding.ASCII.GetBytes("");
                var contracts = _context.Contracts
                    .Where(c => c.Article62Flag == false)
                    .ToList();

                //update article 62 to true in selected contracts
                foreach (var contract in contracts)
                {
                    contract.Article62Flag = true;
                }

                _context.UpdateRange(contracts);

                var articles = _context.Article62V
                    .Select(c => JObject.Parse(c.JsonObject))
                    .ToList();
                //Initialize HTML to PDF converter. 

                foreach (var contract in contracts)
                {
                    contract.Article62Flag = true;
                }

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
                            pdfBytes = await page.PdfDataAsync(pdfOptions);
                        }
                    }
                }

                await _context.SaveChangesAsync();
                transaction.Commit();
                return pdfBytes;
            }
            catch (Exception)
            {
                transaction.Rollback();
                return Encoding.ASCII.GetBytes("");
            }
        }


        public byte[] GetArticle62CSV()
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var contracts = _context.Contracts
                    .Where(c => c.Article62Flag == false)
                    .ToList();

                foreach (var contract in contracts)
                {
                    contract.Article62Flag = true;
                }

                _context.UpdateRange(contracts);
                _context.SaveChanges();

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

                    
                    transaction.Commit();
                    return csvData;
                }
            }
            catch (Exception)
            {
                transaction.Rollback();
                return Encoding.ASCII.GetBytes("");
            }
        }



        public ResponseWithStatus<DataResponse<Boolean>> IsHaveArticle62Documents()
        {
            var contracts = _context.Contracts
                .Where(c => c.Article62Flag == false)
                .ToList();

            if (contracts.Any())
            {
                return ResponseBuilder.CreateDataResponseWithStatus<Boolean>(HttpStatusCode.OK, MessageConstants.HAVE_ARTICLE62, true);
            }

            return ResponseBuilder.CreateDataResponseWithStatus<Boolean>(HttpStatusCode.OK, MessageConstants.NOT_HAVE_ARTICLE62, false);
        }
    }
}
