using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models.HR;
using webapi.Services.HR;

namespace webapi.Controllers.HR
{
    [Authorize]
    [ApiController]
    public class PersonalDataController : ControllerBase
    {
        public readonly IPersonalDataService _personalDataService;

        public PersonalDataController(IPersonalDataService personalDataService)
        {
            _personalDataService = personalDataService;
        }

        [HttpPost("/api/personal-data/create", Name = "Create_PersonalData")]
        public IActionResult Post([FromBody] PersonalDataInsertRequest data)
        {
            var response = _personalDataService.CreatePersonalData(data);

            if (response.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(response);

            return Ok(response);
        }


        [HttpPut("/api/personal-data/update", Name = "Update_PersonalData")]
        public IActionResult Put([FromBody] PersonalDataUpdateRequest data)
        {
            var response = _personalDataService.UpdatePersonalData(data);

            if (Response.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(response);

            return Ok(response);
        }
    }
}
