using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models.Auth;
using webapi.Models.HR;
using webapi.Services.HR;

namespace webapi.Controllers.HR
{
    // [Authorize(Roles = IdentityRoles.Admin)]
    // [Authorize(Roles = IdentityRoles.Accountant)]
    [ApiController]
    public class PersonalDataController : ControllerBase
    {
        private readonly IPersonalDataService _personalDataService;

        public PersonalDataController(IPersonalDataService personalDataService)
        {
            _personalDataService = personalDataService;
        }


        [HttpPost("/api/personal-data/create", Name = "CreatePersonalData")]
        public IActionResult Post([FromBody] PersonalDataDTO personalDataDTO)
        {
            var response = _personalDataService.CreatePersonalData(personalDataDTO);

            if (response.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(response.Response);

            return Ok(response.Response);
        }


        [HttpPut("/api/personal-data/update", Name = "UpdatePersonalData")]
        public IActionResult Put([FromBody] PersonalData personalData)
        {
            var response = _personalDataService.UpdatePersonalData(personalData);

            if (response.StatusCode.Equals(HttpStatusCode.NotFound))
                return NotFound(response);
            else if (response.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(response);

            return Ok(response);
        }
    }
}
