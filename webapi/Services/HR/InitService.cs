using webapi.Models.HR;
using webapi.Models;
using AutoMapper;
using System.Net;
using webapi.Constants;
using webapi.Models.Views;

namespace webapi.Services.HR
{
    public interface IInitService
    {
        public ResponseWithStatus<Response> InitHR(InitAppData initData);
        public ResponseWithStatus<DataResponse<bool>> IsInit();

    }
    public class InitService: IInitService
    {
        public readonly DatabaseContext _context;
        public readonly IMapper _mapper;
        public InitService(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public ResponseWithStatus<Response> InitHR(InitAppData initData)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var position = _mapper.Map<Position>(initData.PositionInsert);
                var department = _mapper.Map<Department>(initData.DepartmentInsert);
                var departmentTeam = _mapper.Map<DepartmentTeam>(initData.DepartmentTeamInsert);

                _context.Departments.Add(department);
                departmentTeam.DepartmentId = department.Id;

                _context.Positions.Add(position);
                _context.DepartmentTeams.Add(departmentTeam);

                _context.SaveChanges();

                transaction.Commit();
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_UPDATE_FAILED);
            }
            catch (Exception)
            {
                transaction.Rollback();
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_UPDATE_SUCCESS);
            }
        }

        public ResponseWithStatus<DataResponse<bool>> IsInit()
        {
            var anyDepartments = _context.Departments.Any();
            var anyPositions = _context.Positions.Any();
            var anyDepartmentTeams = _context.DepartmentTeams.Any();

            if (anyDepartments &&  anyPositions && anyDepartmentTeams)
            {
                return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, true);
            }

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, false);
        }
    }
}
