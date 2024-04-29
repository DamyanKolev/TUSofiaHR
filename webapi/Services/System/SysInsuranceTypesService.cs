using webapi.Models.System;
using webapi.Models;
using System.Net;
using webapi.Constants;

namespace webapi.Services.System
{
    public interface ISysInsuranceTypesService
    {
        public ResponseWithStatus<DataResponse<List<SysInsuranceType>>> SelectAll();
        public ResponseWithStatus<DataResponse<SysInsuranceType>> GetInsuranceByCode(string code);
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

        public ResponseWithStatus<DataResponse<SysInsuranceType>> GetInsuranceByCode(string code)
        {
            var insuranceType = _context.SysInsuranceTypes
                .FirstOrDefault(x => x.Code == code);

            if (insuranceType == null)
            {
                return ResponseBuilder.CreateDataResponseWithStatus<SysInsuranceType>(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_SUCCESS_SELECT, null!);
            }

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, insuranceType);
        }
    }
}
