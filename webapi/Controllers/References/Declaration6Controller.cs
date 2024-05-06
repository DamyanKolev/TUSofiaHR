using Microsoft.AspNetCore.Mvc;
using webapi.Services.References;

namespace webapi.Controllers.References
{
    //[Authorize]
    [ApiController]
    public class Declaration6Controller : ControllerBase
    {
        public readonly IDeclaration6Service _declarationService;

        public Declaration6Controller(IDeclaration6Service declarationService)
        {
            _declarationService = declarationService;
        }


        [HttpGet("/api/hr/references/declaration6/pdf", Name = "GetDeclaration6PDF")]
        public async Task<IActionResult> GetDeclaration6PDF()
        {
            var bytes = await _declarationService.GetDeclaration6PDF();

            return File(bytes, "application/octet-stream"); ;
        }


        [HttpGet("/api/hr/references/declaration6/csv", Name = "GetDeclaration6CSV")]
        public IActionResult GetDeclaration1CSV()
        {
            var bytes = _declarationService.GetDeclaration6CSV();

            return File(bytes, "text/csv"); ;
        }
    }
}
