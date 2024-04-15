using webapi.Models.HR;
using webapi.Models;
using System.Net;
using webapi.Constants;
using AutoMapper;

namespace webapi.Services.HR
{
    public interface IDepartmentTeamService
    {
        public ResponseWithStatus<Response> CreateDepartmentTeam(DepartmentTeamInsert departmentTeamInsert);
        public ResponseWithStatus<Response> UpdateDepartmentTeam(DepartmentTeam departmentTeam);
        public ResponseWithStatus<Response> DeleteDepartmentTeam(int departmentTeanId);
        public ResponseWithStatus<DataResponse<PageResponse<DepartmentTeam>>> GetDepartmentTeamsPage(PageInfo pageInfo);
        public ResponseWithStatus<DataResponse<List<DepartmentTeam>>> GetAllDepartmentTeams();

    }
    public class DepartmentTeamService : IDepartmentTeamService 
    {
        public readonly DatabaseContext _context;
        public readonly IMapper _mapper;
        public DepartmentTeamService(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public ResponseWithStatus<Response> CreateDepartmentTeam(DepartmentTeamInsert departmentTeamInsert)
        {
            var data = _mapper.Map<DepartmentTeam>(departmentTeamInsert);
            _context.DepartmentTeams.Add(data);
            var result = _context.SaveChanges();
            if (result == 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_INSERT_FAILED);
            }

            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_INSERT_SUCCESS);
        }



        public ResponseWithStatus<Response> UpdateDepartmentTeam(DepartmentTeam departmentTeam)
        {
            _context.Update(departmentTeam);
            var result = _context.SaveChanges();

            if (result == 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_UPDATE_FAILED);
            }
            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_UPDATE_SUCCESS);
        }


        public ResponseWithStatus<Response> DeleteDepartmentTeam(int departmentTeanId)
        {
            var departmentTeam = _context.DepartmentTeams.Find(departmentTeanId);

            if (departmentTeam == null)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.NotFound, MessageConstants.MESSAGE_RECORD_NOT_FOUND);
            }

            _context.DepartmentTeams.Remove(departmentTeam);
            var result = _context.SaveChanges();

            if (result == 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_DELETE_FAILED);
            }

            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_DELETE_SUCCESS);
        }


        public ResponseWithStatus<DataResponse<PageResponse<DepartmentTeam>>> GetDepartmentTeamsPage(PageInfo pageInfo)
        {
            var departmentTeams = _context.DepartmentTeams
                .OrderBy(p => p.Id)
                .Skip((pageInfo.PageNumber - 1) * pageInfo.PageSize)
                .Take(pageInfo.PageSize)
                .ToList();

            var countRecords = _context.EmployeeV.ToList().Count;
            var pages = (int)Math.Ceiling(Decimal.Divide(countRecords, pageInfo.PageSize));
            PageResponse<DepartmentTeam> pageResponse = new(pages, countRecords, departmentTeams);

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, pageResponse);
        }


        public ResponseWithStatus<DataResponse<List<DepartmentTeam>>> GetAllDepartmentTeams()
        {
            var departments = _context.DepartmentTeams.ToList();

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, departments);
        }
    }
}
