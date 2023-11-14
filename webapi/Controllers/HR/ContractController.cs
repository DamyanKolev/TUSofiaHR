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

        [HttpPost(Name = "PagePostContract")]
        public IActionResult PagePost([FromBody] Page data)
        {
            var response = _contractService.PageSelectContracts(data.PageNumber, data.PageSize);

            return Ok(response);
        }

        [HttpPost("/create1", Name = "PostContract")]
        public IActionResult Post([FromBody] ContractInsertRequest data)
        {
            //var response = _contractService.CreateContract(data);

            Console.WriteLine(data);

            return Ok(data);
        }


        [HttpPut(Name = "PutContract")]
        public IActionResult Put([FromBody] ContractUpdateRequest data)
        {
            var response = _contractService.UpdateContract(data);

            return Ok(response);
        }
    }
}
