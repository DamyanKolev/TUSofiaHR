using webapi.Models.System;
using webapi.Models;
using System.Net;
using webapi.Constants;

namespace webapi.Services.System
{
    public interface ISysIconomicActivityService
    {
        public ResponseWithStatus<DataResponse<PageResponse<SysIconomicActivity>>> GetIconomicActivitiesPage(PageFilterInfo pageFilterInfo);
    }
    public class SysIconomicActivityService : ISysIconomicActivityService
    {
        public readonly DatabaseContext _context;

        public SysIconomicActivityService(DatabaseContext context)
        {
            _context = context;
        }

        public ResponseWithStatus<DataResponse<PageResponse<SysIconomicActivity>>> GetIconomicActivitiesPage(PageFilterInfo pageFilterInfo)
        {
            var activities = _context.SysIconomicActivities
                .OrderBy(p => p.Id)
                .Skip((pageFilterInfo.PageNumber - 1) * pageFilterInfo.PageSize)
                .Take(pageFilterInfo.PageSize)
                .Where(rec => rec.NkidId.Contains(pageFilterInfo.Filter.Value))
                .ToList();

            var countRecords = _context.EmployeeV.ToList().Count;
            var pages = (int) Math.Ceiling(Decimal.Divide(countRecords, pageFilterInfo.PageSize));
            PageResponse<SysIconomicActivity> pageResponse = new (pages, countRecords, activities);

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, pageResponse);
        }
    }
}
