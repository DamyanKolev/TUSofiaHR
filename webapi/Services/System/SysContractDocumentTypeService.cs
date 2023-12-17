using System.Net;
using webapi.Constants;
using webapi.Models.System;
using webapi.Models;

namespace webapi.Services.System
{
    public interface ISysContractDocumentTypeService
    {
        public ResponseWithStatus<DataResponse<List<SysContractDocumentType>>> GetDocumnetTypes();
    }
    public class SysContractDocumentTypeService: ISysContractDocumentTypeService
    {
        public readonly DatabaseContext _context;

        public SysContractDocumentTypeService(DatabaseContext context)
        {
            _context = context;
        }

        public ResponseWithStatus<DataResponse<List<SysContractDocumentType>>> GetDocumnetTypes()
        {
            var documentTypes = _context.SysContractDocumentTypes
                .OrderBy(p => p.Id)
                .ToList();

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, documentTypes);
        }
    }
}
