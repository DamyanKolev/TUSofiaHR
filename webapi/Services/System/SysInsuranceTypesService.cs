using webapi.Models.System;
using webapi.Models;
using System.Net;
using webapi.Constants;

namespace webapi.Services.System
{
    public interface ISysInsuranceTypesService
    {
        public ResponseWithStatus<DataResponse<List<SysInsuranceType>>> SelectAll();
    }
    public class SysInsuranceTypesService : ISysInsuranceTypesService
    {
        public readonly DatabaseContext _context;

        public SysInsuranceTypesService(DatabaseContext context)
        {
            _context = context;
        }

        public ResponseWithStatus<DataResponse<List<SysInsuranceType>>> SelectAll()
        {
            var insuranceTypes = _context.SysInsuranceTypes
                .OrderBy(p => p.Id)
                .ToList();

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, insuranceTypes);
        }
    }
}
