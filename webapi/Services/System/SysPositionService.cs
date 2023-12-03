using webapi.Models.System;
using webapi.Models;
using System.Net;
using webapi.Constants;

namespace webapi.Services.System
{
    public interface ISysPositionService
    {
        public ResponseWithStatus<DataResponse<List<SysPosition>>> FilteredPageSelect(PageFilterInfo pageFilterInfo);
    }
    public class SysPositionService : ISysPositionService
    {
        public readonly DatabaseContext _context;

        public SysPositionService(DatabaseContext context)
        {
            _context = context;
        }

        public ResponseWithStatus<DataResponse<List<SysPosition>>> FilteredPageSelect(PageFilterInfo pageFilterInfo)
        {
            var administrativeTeritories = _context.SysPositions
                .OrderBy(p => p.Id)
                .Skip((pageFilterInfo.PageNumber - 1) * pageFilterInfo.PageSize)
                .Take(pageFilterInfo.PageSize)
                .Where(rec => rec.NPKDId.Contains(pageFilterInfo.FilterValue))
                .ToList();

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, administrativeTeritories);
        }
    }
}
}
