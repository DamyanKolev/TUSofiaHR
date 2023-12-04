using webapi.Models.System;
using webapi.Models;
using System.Net;
using webapi.Constants;

namespace webapi.Services.System
{
    public interface ISysIconomicActivityService
    {
        public ResponseWithStatus<DataResponse<List<SysIconomicActivity>>> GetIconomicActivitiesPage(PageFilterInfo pageFilterInfo);
    }
    public class SysIconomicActivityService : ISysIconomicActivityService
    {
        public readonly DatabaseContext _context;

        public SysIconomicActivityService(DatabaseContext context)
        {
            _context = context;
        }

        public ResponseWithStatus<DataResponse<List<SysIconomicActivity>>> GetIconomicActivitiesPage(PageFilterInfo pageFilterInfo)
        {
            var administrativeTeritories = _context.SysIconomicActivities
                .OrderBy(p => p.Id)
                .Skip((pageFilterInfo.PageNumber - 1) * pageFilterInfo.PageSize)
                .Take(pageFilterInfo.PageSize)
                .Where(rec => rec.NkidId.Contains(pageFilterInfo.FilterValue))
                .ToList();

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, administrativeTeritories);
        }
    }
}
