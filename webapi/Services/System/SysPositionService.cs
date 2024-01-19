using webapi.Models.System;
using webapi.Models;
using System.Net;
using webapi.Constants;

namespace webapi.Services.System
{
    public interface ISysPositionService
    {
        public ResponseWithStatus<DataResponse<PageResponse<SysPosition>>> GetPositionsPage(PageFilterInfo pageFilterInfo);
    }
    public class SysPositionService : ISysPositionService
    {
        public readonly DatabaseContext _context;

        public SysPositionService(DatabaseContext context)
        {
            _context = context;
        }

        public ResponseWithStatus<DataResponse<PageResponse<SysPosition>>> GetPositionsPage(PageFilterInfo pageFilterInfo)
        {
            var positions = _context.SysPositions
                .OrderBy(p => p.Id)
                .Skip((pageFilterInfo.PageNumber - 1) * pageFilterInfo.PageSize)
                .Take(pageFilterInfo.PageSize)
                .Where(rec => rec.NpkdId.Contains(pageFilterInfo.Filter.Value))
                .ToList();

            var countRecords = _context.EmployeeV.ToList().Count;
            var pages = (int) Math.Ceiling(Decimal.Divide(countRecords, pageFilterInfo.PageSize));
            PageResponse<SysPosition> pageResponse = new (pages, countRecords, positions);

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, pageResponse);
        }
    }
}
