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

        [HttpPost("/api/contracts/page", Name = "Contract_Page")]
        public IActionResult PagePost([FromBody] PageRequest data)
        {
            //var response = _contractService.PageSelectContracts(data.PageNumber, data.PageSize);

            var contract = new Contract
            {
                Id = 0,
                WorkingWage = 1200,
                WorkTime = 40,
                ConclusionDate = new DateOnly()
            };

            var contract1 = new Contract
            {
                Id = 5,
                WorkingWage = 1500,
                WorkTime = 48,
                ConclusionDate = new DateOnly()
            };

            var contracts = new List<Contract>();
            contracts.Add(contract);
            contracts.Add(contract1);


            return Ok(contracts);
        }

        [HttpPost("/api/contracts/create", Name = "PostContract")]
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
