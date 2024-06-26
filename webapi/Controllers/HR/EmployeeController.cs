﻿using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Models.Auth;
using webapi.Models.HR;
using webapi.Services.HR;

namespace webapi.Controllers.HR
{
    //[Authorize(Roles = IdentityRoles.Admin)]
    //[Authorize(Roles = IdentityRoles.Accountant)]
    [Authorize]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpPost("/api/hr/employees/create", Name = "CreateEmployee")]
        public IActionResult Post([FromBody] EmployeeDataInsert employeeDataInsert)
        {
            var result = _employeeService.CreateEmployee(employeeDataInsert);

            if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }


        [HttpPut("/api/hr/employees/update", Name = "UpdateEmployee")]
        public IActionResult Put([FromBody] EmployeeDataUpdate employeeDataUpdate)
        {
            var result = _employeeService.UpdateEmployee(employeeDataUpdate);

            if (result.StatusCode.Equals(HttpStatusCode.NotFound))
                return NotFound(result.Response);
            else if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }

        [HttpPost("/api/hr/employees/page", Name = "GetEmployeesPage")]
        public IActionResult GetEmployeesPage([FromBody] PageInfo pageInfo)
        {
            var result = _employeeService.GetEmployeesPage(pageInfo);

            return Ok(result.Response);
        }

        [HttpGet("/api/hr/employees/all", Name = "SelectAll")]
        public IActionResult SelectAll()
        {
            var result = _employeeService.SelectAll();

            return Ok(result.Response);
        }

        [HttpGet("/api/hr/employees/find-by-id", Name = "FindEmployeeById")]
        public IActionResult FindById([FromBody] int employeeId)
        {
            var result = _employeeService.GetById(employeeId);

            return Ok(result.Response);
        }

        [HttpPost("/api/hr/employees/update-data", Name = "GetUpdateData")]
        public IActionResult GetUpdateData([FromBody] EmployeeDataSelectDTO selectDTO)
        {
            var result = _employeeService.GetUpdateData(selectDTO);

            return Ok(result.Response);
        }


        [HttpPost("/api/hr/employees/work-data", Name = "WorkDataByEmployeeId")]
        public IActionResult WorkDataByEmployeeId([FromBody] int employeeId)
        {
            var result = _employeeService.WorkDataByEmployeeId(employeeId);

            return Ok(result.Response);
        }
    }
}
