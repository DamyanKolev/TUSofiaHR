using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using webapi.Models.HR;
using webapi.Services.HR;

namespace webapi.Controllers.HR
{
    [Authorize]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService _companyService;

        public CompanyController(ICompanyService companyService)
        {
            _companyService = companyService;
        }

        [Authorize(Roles = "Admin")]
        [Authorize(Roles = "Accountant")]
        [HttpPost("/api/company/create", Name = "Create_Company")]
        public IActionResult Post([FromBody] CompanyDTO data)
        {
            var response = _companyService.CreateCompany(data);

            if (response.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(response);

            return Ok(response);
        }


        [Authorize(Roles = "Admin")]
        [Authorize(Roles = "Accountant")]
        [HttpPatch("/api/company/update", Name = "Update_Company")]
        public IActionResult Put([FromBody] CompanyUpdateRequest data)
        {
            var response = _companyService.UpdateCompany(data);

            if (response.StatusCode.Equals(HttpStatusCode.NotFound))
                return NotFound(response);
            else if (response.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(response);

            return Ok(response);
        }
    }
}
