using AutoMapper;
using webapi.Models.Auth;
using webapi.Models.HR;
using webapi.Models.Views;

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

            CreateMap<AddressDTO, Address>();

            CreateMap<Company, CompanyDTO>();
            CreateMap<CompanyDTO, Company>();

            CreateMap<RoleDTO, Role>();
            CreateMap<UserDTO, User>();

            CreateMap<EmployeeV, EmployeeV>();
            CreateMap<ContractV, ContractV>();
        }
    }
}
