using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Models.HR;
using webapi.Services.HR;

namespace webapi.Controllers.HR
{
    //[Authorize]
    [ApiController]
    [Route("hr/contracts")]
    public class ContractController: ControllerBase
    {
        public readonly ContractService _contractService;

        public ContractController(ContractService contractService)
        {
            _contractService = contractService;
        }

        //[HttpPost(Name = "PagePostContract")]
        //public IActionResult PagePost([FromBody] Page data)
        //{
        //    var response = _contractService.PageSelectContracts(data.PageNumber, data.PageSize);

        //    return Ok(response);
        //}

        [HttpPost(Name = "PostContract")]
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
