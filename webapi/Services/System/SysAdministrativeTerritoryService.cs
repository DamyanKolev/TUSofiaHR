using System.Net;
using webapi.Constants;
using webapi.Models;
using webapi.Models.System;

namespace webapi.Services.System
{
    public interface ISysAdministrativeTerritoryService
    {
        public ResponseWithStatus<DataResponse<List<SysAdministrativeTerritory>>> GetAdministrativeTerritoriesPage(PageFilterInfo pageFilterInfo);
    }
    public class SysAdministrativeTerritoryService : ISysAdministrativeTerritoryService
    {
        public readonly DatabaseContext _context;

        public SysAdministrativeTerritoryService(DatabaseContext context)
        {
            _context = context;
        }

        public ResponseWithStatus<DataResponse<List<SysAdministrativeTerritory>>> GetAdministrativeTerritoriesPage(PageFilterInfo pageFilterInfo)
        {
            var administrativeTeritories = _context.SysAdministrativeTerritories
                .OrderBy(p => p.Id)
                .Skip((pageFilterInfo.PageNumber - 1) * pageFilterInfo.PageSize)
                .Take(pageFilterInfo.PageSize)
                .Where(rec => rec.Ekatte.Contains(pageFilterInfo.FilterValue))
                .ToList();

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, administrativeTeritories);
        }
    }
}
