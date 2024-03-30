using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using webapi.Models.Auth;
using webapi.Models.HR;
using webapi.Services.HR;

namespace webapi.Controllers.Auth
{
    [Authorize(Roles = IdentityRoles.Admin)]
    [Authorize(Roles = IdentityRoles.Accountant)]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService _companyService;

        public CompanyController(ICompanyService companyService)
        {
            _companyService = companyService;
        }


        [HttpPost("/api/company/create", Name = "CreateCompany")]
        public IActionResult Post([FromBody] CompanyDTO companyDTO)
        {
            var result = _companyService.CreateCompany(companyDTO);

            if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }


        [HttpPut("/api/company/update", Name = "UpdateCompany")]
        public IActionResult Put([FromBody] Company company)
        {
            var result = _companyService.UpdateCompany(company);

            if (result.StatusCode.Equals(HttpStatusCode.NotFound))
                return NotFound(result.Response);
            else if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }
    }
}
