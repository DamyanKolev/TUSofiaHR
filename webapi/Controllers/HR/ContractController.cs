using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Models.Auth;
using webapi.Models.HR;
using webapi.Services.HR;

namespace webapi.Controllers.HR
{
    // [Authorize(Roles = IdentityRoles.Admin)]
    // [Authorize(Roles = IdentityRoles.Accountant)]
    [ApiController]
    public class ContractController: ControllerBase
    {
        public readonly IContractService _contractService;

        public ContractController(IContractService contractService)
        {
            _contractService = contractService;
        }


        [HttpPost("/api/contracts/create", Name = "CreateContract")]
        public IActionResult Post([FromBody] ContractDTO contractDTO)
        {
            var result = _contractService.CreateContract(contractDTO);

            if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }


        [HttpPut("/api/contracts/update", Name = "UpdateContract")]
        public IActionResult UpdateContract([FromBody] Contract contract)
        {
            var result = _contractService.UpdateContract(contract);

            if (result.StatusCode.Equals(HttpStatusCode.NotFound))
                return NotFound(result.Response);
            else if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }


        [HttpPost("/api/contracts/page", Name = "GetContractsPage")]
        public IActionResult GetContractsPage([FromBody] PageInfo pageInfo)
        {
            var result = _contractService.GetContractsPage(pageInfo);

            return Ok(result.Response);
        }


        [HttpPost("/api/contracts/find-by-id", Name = "GetContractById")]
        public IActionResult GetContractById([FromBody] long contractId)
        {
            var result = _contractService.GetContractById(contractId);

            return Ok(result.Response);
        }
    }
}
