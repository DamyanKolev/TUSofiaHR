using System.Net;
using AutoMapper;
using webapi.Constants;
using webapi.Models;
using webapi.Models.Views;

namespace webapi.Services.References
{
    public interface IArticle62Service
    {
        public ResponseWithStatus<DataResponse<PageResponse<Article62V>>> GetArticle62Page(PageInfo pageInfo);
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



        public ResponseWithStatus<DataResponse<PageResponse<Article62V>>> GetArticle62Page(PageInfo pageInfo) {
            var articles = _context.ContractV
                .Select(c => _mapper.Map<Article62V>(c))
                .Skip((pageInfo.PageNumber - 1) * pageInfo.PageSize)
                .Take(pageInfo.PageSize)
                .ToList();
            
            var countRecords = _context.EmployeeV.ToList().Count;
            var pages = (int) Math.Ceiling(Decimal.Divide(countRecords, pageInfo.PageSize));
            PageResponse<Article62V> pageResponse = new (pages, countRecords, articles);

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, pageResponse);
        }

    }
}
