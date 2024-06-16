using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Services.References;

namespace webapi.Controllers.References
{
    [Authorize]
    [ApiController]
    public class Article62Controller: ControllerBase
    {
        public readonly IArticle62Service _articleService;

        public Article62Controller(IArticle62Service articleService)
        {
            _articleService = articleService;
        }

        [HttpGet("/api/hr/references/article62/pdf", Name = "GetArticle62PDF")]
        public async Task<IActionResult> GetArticle62PDF()
        {
            var bytes = await _articleService.GetArticle62PDF();

            return File(bytes, "application/octet-stream"); ;
        }


        [HttpGet("/api/hr/references/article62/csv", Name = "GetArticle62CSV")]
        public IActionResult GetArticle62CSV()
        {
            var bytes = _articleService.GetArticle62CSV();

            return File(bytes, "text/csv"); ;
        }


        [HttpGet("/api/hr/references/article62/is-have", Name = "IsHaveArticle62Documents")]
        public IActionResult IsHaveArticle62Documents()
        {
            var result = _articleService.IsHaveArticle62Documents();

            return Ok(result.Response);
        }
    }
}
