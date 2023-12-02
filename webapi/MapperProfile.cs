using AutoMapper;
using webapi.Models.Auth;
using webapi.Models.HR;

namespace webapi
{
    public class MapperProfile: Profile
    {
        public MapperProfile()
        {
            CreateMap<Employee, EmployeeDTO>();
            CreateMap<Position, PositionRequest>();

            CreateMap<RoleRequest, Role>();
            CreateMap<UserRequest, User>();
        }
    }
}
