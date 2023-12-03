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
        private readonly IPersonalDataService _personalDataService;

        public PersonalDataController(IPersonalDataService personalDataService)
        {
            _personalDataService = personalDataService;
        }


        [Authorize(Roles = "Admin")]
        [Authorize(Roles = "Accountant")]
        [HttpPost("/api/personal-data/create", Name = "Create_PersonalData")]
        public IActionResult Post([FromBody] PersonalDataDTO data)
        {
            var response = _personalDataService.CreatePersonalData(data);

            if (response.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(response);

            return Ok(response);
        }


        [Authorize(Roles = "Admin")]
        [Authorize(Roles = "Accountant")]
        [HttpPut("/api/personal-data/update", Name = "Update_PersonalData")]
        public IActionResult Put([FromBody] PersonalDataUpdateRequest data)
        {
            var response = _personalDataService.UpdatePersonalData(data);

            if (response.StatusCode.Equals(HttpStatusCode.NotFound))
                return NotFound(response);
            else if (response.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(response);

            return Ok(response);
        }
    }
}
