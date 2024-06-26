﻿using AutoMapper;
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
            CreateMap<InsuranceDTO, Insurance>();
            CreateMap<ScheduleDTO, Schedule>();
            CreateMap<IncomeDTO, Income>();
            CreateMap<CompanyEmployeeTaxDTO, CompanyEmployeeTax>();
            CreateMap<DepartmentDTO, Department>();

            CreateMap<ContractV, Article62V>();

            CreateMap<RoleDTO, Role>();
            CreateMap<UserDTO, User>();
        }
    }
}
