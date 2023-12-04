using webapi.Models.System;
using webapi.Models;
using System.Net;
using webapi.Constants;

namespace webapi.Services.System
{
    public interface ISysContractTerminationTypeService
    {
        public ResponseWithStatus<DataResponse<List<SysContractTerminationType>>> GetContractTerminationTypesPage();
    }
    public class SysContractTerminationTypeService : ISysContractTerminationTypeService
    {
        public readonly DatabaseContext _context;

        public SysContractTerminationTypeService(DatabaseContext context)
        {
            _context = context;
        }

        public ResponseWithStatus<DataResponse<List<SysContractTerminationType>>> GetContractTerminationTypesPage()
        {
            var administrativeTeritories = _context.SysContractTerminationTypes
                .OrderBy(p => p.Id)
                .ToList();

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, administrativeTeritories);
        }
    }
}
