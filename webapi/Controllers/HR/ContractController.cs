using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Models.HR;
using webapi.Services.HR;

namespace webapi.Controllers.HR
{
    //[Authorize]
    [Route("hr/contracts")]
    [ApiController]
    public class ContractController: ControllerBase
    {
        public readonly IContractService _contractService;

        public ContractController(IContractService contractService)
        {
            _contractService = contractService;
        }

        [Authorize(Roles = "Admin")]
        [Authorize(Roles = "Accountant")]
        [HttpPost("/api/contracts/page", Name = "Contract_Page")]
        public IActionResult PagePost([FromBody] PageRequest data)
        {
            //var response = _contractService.PageSelectContracts(data.PageNumber, data.PageSize);

            return Ok();
        }

        //[Authorize(Roles = "Admin")]
        //[Authorize(Roles = "Accountant")]
        [HttpPost("/api/contracts/create", Name = "PostContract")]
        public IActionResult Post([FromBody] ContractDTO data)
        {
            //var response = _contractService.CreateContract(data);

            //if (response.StatusCode.Equals(HttpStatusCode.BadRequest))
            //    return BadRequest(response);

            return Ok(data);
        }

        [Authorize(Roles = "Admin")]
        [Authorize(Roles = "Accountant")]
        [HttpPut("/api/contracts/update", Name = "PutContract")]
        public IActionResult Put([FromBody] ContractUpdateRequest data)
        {
            var response = _contractService.UpdateContract(data);

            if (response.StatusCode.Equals(HttpStatusCode.NotFound))
                return NotFound(response);
            else if (response.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(response);

            return Ok(response);
        }
    }
}
