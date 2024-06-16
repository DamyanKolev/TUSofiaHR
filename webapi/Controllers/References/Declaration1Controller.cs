using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Services.References;

namespace webapi.Controllers.References
{
    [Authorize]
    [ApiController]
    public class Declaration1Controller : ControllerBase
    {
        public readonly IDeclaration1Service _declarationService;

        public Declaration1Controller(IDeclaration1Service declarationService)
        {
            _declarationService = declarationService;
        }


        [HttpGet("/api/hr/references/declaration1/pdf", Name = "GetDeclaration1PDF")]
        public async Task<IActionResult> GetDeclaration1PDF()
        {
            var bytes = await _declarationService.GetDeclaration1PDF();

            return File(bytes, "application/octet-stream"); ;
        }


        [HttpGet("/api/hr/references/declaration1/csv", Name = "GetDeclaration1CSV")]
        public IActionResult GetDeclaration1CSV()
        {
            var bytes = _declarationService.GetDeclaration1CSV();

            return File(bytes, "text/csv"); ;
        }
    }
}
