using AutoMapper;
using webapi.Models.HR;

namespace webapi
{
    public class MapperProfile: Profile
    {
        public MapperProfile()
        {
            CreateMap<Employee, EmployeeInsertRequest>();
            CreateMap<Employee, EmployeeUpdate>();
        }
    }
}
