using webapi.Models.System;
using webapi.Models;
using System.Net;
using webapi.Constants;

namespace webapi.Services.System
{
    public interface ISysContractTypeService
    {
        public ResponseWithStatus<DataResponse<List<SysContractTypes>>> SelectAll();
    }
    public class SysContractTypeService : ISysContractTypeService
    {
        public readonly DatabaseContext _context;

        public SysContractTypeService(DatabaseContext context)
        {
            _context = context;
        }

        public ResponseWithStatus<DataResponse<List<SysContractTypes>>> SelectAll()
        {
            var administrativeTeritories = _context.SysContractTypes
                .OrderBy(p => p.Id)
                .ToList();

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, administrativeTeritories);
        }
    }
}
