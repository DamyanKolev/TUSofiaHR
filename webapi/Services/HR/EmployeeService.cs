﻿using System.Linq;
using System.Net;
using AutoMapper;
using webapi.Constants;
using webapi.Models;
using webapi.Models.HR;
using webapi.Models.Views;

namespace webapi.Services.HR
{
    public interface IEmployeeService
    {
        public ResponseWithStatus<Response> CreateEmployee(EmployeeDataInsert employeeDataInsert);
        public ResponseWithStatus<Response> UpdateEmployee(EmployeeDataUpdate employeeDataUpdate);
        public ResponseWithStatus<DataResponse<PageResponse<EmployeeV>>> GetEmployeesPage(PageInfo pageInfo);
        public ResponseWithStatus<DataResponse<List<EmployeeV>>> SelectAll();
        public ResponseWithStatus<DataResponse<EmployeeDataSelect>> GetUpdateData(EmployeeDataSelectDTO selectDTO);
        public ResponseWithStatus<DataResponse<Employee>> GetById(int employeeId);
        public ResponseWithStatus<DataResponse<WorkDataV>> WorkDataByEmployeeId(int employeeId);
    }

    public class EmployeeService : IEmployeeService
    {
        public readonly DatabaseContext _context;
        public readonly IContractService _contractService;
        public readonly IMapper _mapper;

        public EmployeeService(DatabaseContext context, IMapper mapper, IContractService contractService)
        {
            _context = context;
            _mapper = mapper;
            _contractService = contractService;
        }

        public ResponseWithStatus<Response> CreateEmployee(EmployeeDataInsert employeeDataInsert)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var address = _mapper.Map<Address>(employeeDataInsert.Address);
                var personalData = _mapper.Map<PersonalData>(employeeDataInsert.PersonalData);
                var contract = _mapper.Map<Contract>(employeeDataInsert.Contract);
                var employee = _mapper.Map<Employee>(employeeDataInsert.Employee);
                var insurance = _mapper.Map<Insurance>(employeeDataInsert.Insurance);

                personalData.Address = address;

                if (insurance != null)
                {
                    employee.Insurance = insurance;
                }
                employee.PersonalData = personalData;
                _context.Employees.Add(employee);

                if (contract != null)
                {
                    _context.Contracts.Add(contract);
                    var employeeContract = new EmployeeContracts { 
                        EmployeeId = employee.Id, 
                        Employee = employee, 
                        ContractId = contract.Id, 
                        Contract = contract,
                        IsActive = true 
                    };
                    _context.EmployeeContracts.Add(employeeContract);
                }

                var result = _context.SaveChanges();

                transaction.Commit();
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_INSERT_SUCCESS);
            }
            catch (Exception е)
            {
                transaction.Rollback();
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, е.ToString());
            }
        }

        public ResponseWithStatus<Response> UpdateEmployee(EmployeeDataUpdate employeeDataUpdate)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                if (employeeDataUpdate.Employee != null)
                {
                    _context.Update(employeeDataUpdate.Employee);
                }
                if (employeeDataUpdate.PersonalData != null)
                {
                    _context.Update(employeeDataUpdate.PersonalData);
                }
                if (employeeDataUpdate.Insurance != null)
                {
                    _context.Update(employeeDataUpdate.Insurance);
                }
                if (employeeDataUpdate.Address != null)
                {
                    _context.Update(employeeDataUpdate.Address);
                }
                var result = _context.SaveChanges();

                transaction.Commit();
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_UPDATE_FAILED);
            }
            catch (Exception)
            {
                transaction.Rollback();
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_UPDATE_SUCCESS);
            }
        }

        public ResponseWithStatus<DataResponse<PageResponse<EmployeeV>>> GetEmployeesPage(PageInfo pageInfo)
        {
            var employees = _context.EmployeeV
                //.OrderBy(p => p.EmployeeId)
                .Skip((pageInfo.PageNumber - 1) * pageInfo.PageSize)
                .Take(pageInfo.PageSize)
                .ToList();

            var countRecords = _context.EmployeeV.ToList().Count;
            var pages = (int) Math.Ceiling(Decimal.Divide(countRecords, pageInfo.PageSize));
            PageResponse<EmployeeV> pageResponse = new (pages, countRecords, employees);
                
            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, pageResponse);
        }

        public ResponseWithStatus<DataResponse<List<EmployeeV>>> SelectAll()
        {
            var employees = _context.EmployeeV
                .OrderBy(x => x.EmployeeId)
                .ToList();

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, employees);
        }

        public ResponseWithStatus<DataResponse<EmployeeDataSelect>> GetUpdateData(EmployeeDataSelectDTO selectDTO) {
            var employee = _context.Employees.Find(selectDTO.EmployeeId);
            var personalData = _context.PersonalData.Find(selectDTO.PersonalDataId);
            Insurance? insurance = null;
            Address? address = null;


            if (employee == null || personalData == null) {
                return ResponseBuilder.CreateDataResponseWithStatus<EmployeeDataSelect>(HttpStatusCode.OK, MessageConstants.MESSAGE_RECORD_NOT_FOUND, null!);
            }

            if (employee.InsuranceId != null)
            {
                insurance = _context.Insurances.Find(employee.InsuranceId);
            }
            if (personalData.AddressId != null)
            {
                address = _context.Addresses.Find(personalData.Id);
            }

            EmployeeDataSelect employeeDataSelect = new EmployeeDataSelect {
                Employee = employee, 
                PersonalData = personalData,
                Insurance = insurance, 
                Address = address 
            }; 
            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, employeeDataSelect);
        }


        public ResponseWithStatus<DataResponse<Employee>> GetById(int employeeId)
        {
            var employee = _context.Employees.Find(employeeId);

            if (employee == null)
            {
                return ResponseBuilder.CreateDataResponseWithStatus<Employee>(HttpStatusCode.OK, MessageConstants.MESSAGE_RECORD_NOT_FOUND, null!);
            }

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, employee);
        }


        public ResponseWithStatus<DataResponse<WorkDataV>> WorkDataByEmployeeId(int employeeId)
        {
            var workData = _context.WorkDataV
                .Where(w => w.EmployeeId == employeeId)
                .FirstOrDefault();

            if (workData == null)
            {
                return ResponseBuilder.CreateDataResponseWithStatus<WorkDataV>(HttpStatusCode.OK, MessageConstants.MESSAGE_RECORD_NOT_FOUND, null!);
            }

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, workData);
        }
    }
}
