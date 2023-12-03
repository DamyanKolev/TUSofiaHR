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
            CreateMap<EmployeeDTO, Employee>();

            CreateMap<Contract, ContractDTO>();
            CreateMap<ContractDTO, Contract>();

            CreateMap<Position, PositionDTO>();
            CreateMap<PositionDTO, Position>();

            CreateMap<PersonalData, PersonalDataDTO>();
            CreateMap<PersonalDataDTO, PersonalData>();

            CreateMap<Company, CompanyDTO>();
            CreateMap<CompanyDTO, Company>();

            CreateMap<RoleRequest, Role>();
            CreateMap<UserRequest, User>();
        }
    }
}
