﻿using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Models.HR;
using webapi.Services.HR;

namespace webapi.Controllers.HR
{
    // [Authorize(Roles = IdentityRoles.Admin)]
    // [Authorize(Roles = IdentityRoles.Accountant)]
    [Authorize]
    [ApiController]
    public class ContractController: ControllerBase
    {
        public readonly IContractService _contractService;

        public ContractController(IContractService contractService)
        {
            _contractService = contractService;
        }


        [HttpPost("/api/hr/contracts/create", Name = "CreateContract")]
        public IActionResult CreateContract([FromBody] EmployeeContractInsert employeeContractInsert)
        {
            var result = _contractService.CreateContract(employeeContractInsert);

            if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }


        [HttpPost("/api/hr/contracts/create-annex", Name = "CreateAnnex")]
        public IActionResult CreateAnnex([FromBody] ContractDTO contractDTO)
        {
            var result = _contractService.CreateAnnex(contractDTO);

            if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }


        [HttpPut("/api/hr/contracts/update", Name = "UpdateContract")]
        public IActionResult Update([FromBody] Contract contract)
        {
            var result = _contractService.Update(contract);

            if (result.StatusCode.Equals(HttpStatusCode.NotFound))
                return NotFound(result.Response);
            else if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }


        [HttpPost("/api/hr/contracts/page", Name = "GetContractsPage")]
        public IActionResult GetContractsPage([FromBody] PageInfo pageInfo)
        {
            var result = _contractService.GetContractsPage(pageInfo);

            return Ok(result.Response);
        }


        [HttpPost("/api/hr/contracts/find-by-id", Name = "GetContractById")]
        public IActionResult GetContractById([FromBody] int contractId)
        {
            var result = _contractService.GetById(contractId);

            return Ok(result.Response);
        }


        [HttpPost("/api/hr/contracts/find-by-employee-id", Name = "GetContractByEmployeeId")]
        public IActionResult GetByEmployeeId([FromBody] int employeeId)
        {
            var result = _contractService.GetByEmployeeId(employeeId);

            return Ok(result.Response);
        }


        [HttpPost("/api/hr/contracts/all-by-employee-id", Name = "FindByEmployeeId")]
        public IActionResult FindByEmployeeId([FromBody] int employeeId)
        {
            var result = _contractService.FindByEmployeeId(employeeId);

            return Ok(result.Response);
        }
    }
}
