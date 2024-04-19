using Microsoft.AspNetCore.Mvc;
using System.Net;
using webapi.Models.HR;
using webapi.Models;
using webapi.Services.HR;
using Microsoft.AspNetCore.Authorization;

namespace webapi.Controllers.HR
{
    [Authorize]
    [ApiController]
    public class DepartmentTeamController : ControllerBase
    {
        private readonly IDepartmentTeamService _departmentTeamService;

        public DepartmentTeamController(IDepartmentTeamService departmentTeamService)
        {
            _departmentTeamService = departmentTeamService;
        }


        [HttpPost("/api/hr/department-team/create", Name = "CreateDepartmentTeam")]
        public IActionResult CreateDepartment([FromBody] DepartmentTeamInsert departmentTeamInsert)
        {
            var result = _departmentTeamService.CreateDepartmentTeam(departmentTeamInsert);

            if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }


        [HttpPut("/api/hr/department-team/update", Name = "UpdateDepartemntTeam")]
        public IActionResult UpdateDepartment([FromBody] DepartmentTeam departmentTeam)
        {
            var result = _departmentTeamService.UpdateDepartmentTeam(departmentTeam);

            if (result.StatusCode.Equals(HttpStatusCode.NotFound))
                return NotFound(result.Response);
            else if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }


        [HttpDelete("/api/hr/department-team/delete", Name = "DeleteDepartmentTeam")]
        public IActionResult DeleteDepartment([FromBody] int departmentTeamId)
        {
            var result = _departmentTeamService.DeleteDepartmentTeam(departmentTeamId);

            if (result.StatusCode.Equals(HttpStatusCode.NotFound))
                return NotFound(result.Response);
            else if (result.StatusCode.Equals(HttpStatusCode.BadRequest))
                return BadRequest(result.Response);

            return Ok(result.Response);
        }


        [HttpPost("/api/hr/department-team/page", Name = "GetDepartmentTeamsPage")]
        public IActionResult GetDepartmentsPage([FromBody] PageInfo pageInfo)
        {
            var result = _departmentTeamService.GetDepartmentTeamsPage(pageInfo);

            return Ok(result.Response);
        }


        [HttpGet("/api/hr/department-team/all", Name = "GetAllDepartmentTeams")]
        public IActionResult GetAllDepartments()
        {
            var result = _departmentTeamService.GetAllDepartmentTeams();

            return Ok(result.Response);
        }
    }
}
