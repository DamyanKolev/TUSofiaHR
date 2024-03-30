using System.Net;
using webapi.Constants;
using webapi.Models.System;
using webapi.Models;

namespace webapi.Services.System
{
    public interface ISysPaymentTypeService
    {
        public ResponseWithStatus<DataResponse<List<SysPaymentType>>> SelectAll();
    }
    public class SysPaymentTypeService : ISysPaymentTypeService
    {
        public readonly DatabaseContext _context;

        public SysPaymentTypeService(DatabaseContext context)
        {
            _context = context;
        }

        public ResponseWithStatus<DataResponse<List<SysPaymentType>>> SelectAll()
        {
            var paymentTypes = _context.SysPaymentTypes
                .OrderBy(p => p.Id)
                .ToList();

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, paymentTypes);
        }
    }
}
