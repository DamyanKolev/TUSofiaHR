using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models.Auth;
using webapi.Services.System;

namespace webapi.Controllers.System
{
    //[Authorize(Roles = IdentityRoles.Admin)]
    //[Authorize(Roles = IdentityRoles.Accountant)]
    [Authorize]
    [ApiController]
    public class SysContractDocumentTypeController : ControllerBase
    {
        private readonly ISysContractDocumentTypeService _documentTypeService;

        public SysContractDocumentTypeController(ISysContractDocumentTypeService documentTypeService)
        {
            _documentTypeService = documentTypeService;
        }


        [HttpGet("/api/sys/document-type/all", Name = "GetDocumentTypes")]
        public IActionResult GetContractTypes()
        {
            var result = _documentTypeService.SelectAll();

            return Ok(result.Response);
        }
    }
}
