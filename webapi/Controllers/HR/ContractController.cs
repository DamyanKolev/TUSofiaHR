using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Models.Auth;
using webapi.Models.HR;
using webapi.Services.HR;

namespace webapi.Controllers.HR
{
    [Authorize(Roles = IdentityRoles.Admin)]
    [Authorize(Roles = IdentityRoles.Accountant)]
    [ApiController]
    public class ContractController: ControllerBase
    {
        public readonly IContractService _contractService;

        public ContractController(IContractService contractService)
        {
            _contractService = contractService;
        }


        [HttpPost("/api/contracts/page", Name = "GetContractsPage")]
        public IActionResult GetContractsPage([FromBody] PageInfo pageInfo)
        {
            var result = _contractService.GetContractsPage(pageInfo);

            return Ok(result.Response);
        }


        [HttpPost("/api/contracts/create", Name = "CreateContract")]
        public IActionResult Post([FromBody] ContractDTO contractDTO)
        {
            var result = _contractService.CreateContract(contractDTO);

            if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }


        [HttpPatch("/api/contracts/update", Name = "UpdateContract")]
        public IActionResult Patch([FromBody] ContractUpdateDTO updateDTO)
        {
            var result = _contractService.UpdateContract(updateDTO);

            if (result.StatusCode.Equals(HttpStatusCode.NotFound))
                return NotFound(result.Response);
            else if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }
    }
}
