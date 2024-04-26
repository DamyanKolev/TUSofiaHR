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

        [HttpPost("/api/hr/references/article62/page", Name = "GetArticle62Page")]
        public IActionResult GetArticle62Page([FromBody] PageInfo pageInfo)
        {
            var result = _articleService.GetArticle62Page(pageInfo);

            return Ok(result.Response);
        }
    }
}
