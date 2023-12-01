using AutoMapper;
using webapi.Models.Auth;
using webapi.Models.HR;

namespace webapi
{
    public class MapperProfile: Profile
    {
        public MapperProfile()
        {
            CreateMap<Employee, EmployeeInsertRequest>();
            CreateMap<Employee, EmployeeUpdate>();
            CreateMap<RoleRequest, Role>();
            CreateMap<UserRequest, User>();
        }
    }
}
