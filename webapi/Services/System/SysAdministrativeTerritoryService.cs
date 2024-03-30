using System.Net;
using webapi.Constants;
using webapi.Models;
using webapi.Models.System;

namespace webapi.Services.System
{
    public interface ISysAdministrativeTerritoryService
    {
        public ResponseWithStatus<DataResponse<PageResponse<SysAdministrativeTerritory>>> GetAdministrativeTerritoriesPage(PageFilterInfo pageFilterInfo);
        public ResponseWithStatus<DataResponse<List<SysAdministrativeTerritory>>> SelectAll();
    }
    public class SysAdministrativeTerritoryService : ISysAdministrativeTerritoryService
    {
        public readonly DatabaseContext _context;

        public SysAdministrativeTerritoryService(DatabaseContext context)
        {
            _context = context;
        }

        public ResponseWithStatus<DataResponse<PageResponse<SysAdministrativeTerritory>>> GetAdministrativeTerritoriesPage(PageFilterInfo pageFilterInfo)
        {
            var administrativeTeritories = _context.SysAdministrativeTerritories
                .OrderBy(p => p.Id)
                .Skip((pageFilterInfo.PageNumber - 1) * pageFilterInfo.PageSize)
                .Take(pageFilterInfo.PageSize)
                .Where(rec => rec.Ekatte.Contains(pageFilterInfo.Filter.Value))
                .ToList();

            var countRecords = _context.EmployeeV.ToList().Count;
            var pages = (int) Math.Ceiling(Decimal.Divide(countRecords, pageFilterInfo.PageSize));
            PageResponse<SysAdministrativeTerritory> pageResponse = new (pages, countRecords, administrativeTeritories);

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, pageResponse);
        }

        public ResponseWithStatus<DataResponse<List<SysAdministrativeTerritory>>> SelectAll()
        {
            var administrativeTeritories = _context.SysAdministrativeTerritories
                .OrderBy(x => x.Id)
                .ToList();

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, administrativeTeritories);
        }
    }
}
