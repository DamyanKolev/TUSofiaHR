using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models.HR;
using webapi.Services.HR;

namespace webapi.Controllers.HR
{
    [Authorize]
    [ApiController]
    [Route("hr/personal-data")]
    public class PersonalDataController : ControllerBase
    {
        public readonly IPersonalDataService _personalDataService;

        public PersonalDataController(IPersonalDataService personalDataService)
        {
            _personalDataService = personalDataService;
        }

        [HttpPost(Name = "PostPersonalData")]
        public IActionResult Post([FromBody] PersonalDataInsertRequest data)
        {
            var response = _personalDataService.CreatePersonalData(data);

            return Ok(response);
        }



        [HttpPut(Name = "PutPersonalData")]
        public IActionResult Put([FromBody] PersonalDataUpdateRequest data)
        {
            var response = _personalDataService.UpdatePersonalData(data);

            return Ok(response);
        }
    }
}
