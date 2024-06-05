using webapi.Models.HR;
using webapi.Models;
using AutoMapper;
using System.Net;
using webapi.Constants;
using webapi.Models.Views;

namespace webapi.Services.HR
{
    public interface IEndMonthService
    {
        public ResponseWithStatus<Response> EndMonth(EndMonthDataInsert insertDTO);
        public ResponseWithStatus<DataResponse<EndMonthDataSelect>> SelectEndMonthData(int employeeId);
        public ResponseWithStatus<Response> FinishMonth();
        public ResponseWithStatus<DataResponse<Boolean>> IsFilledAllEmployeesMonthData();

    }
    public class EndMonthService : IEndMonthService
    {
        public readonly DatabaseContext _context;
        public readonly IMapper _mapper;
        public EndMonthService(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        public ResponseWithStatus<Response> EndMonth(EndMonthDataInsert insertDTO)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var schedule = _mapper.Map<Schedule>(insertDTO.Schedule);
                var income = _mapper.Map<Income>(insertDTO.Income);
                var companyEmployeeTax = _mapper.Map<CompanyEmployeeTax>(insertDTO.CompanyEmployeeTax);

                _context.Schedules.Add(schedule);
                _context.Incomes.Add(income);
                _context.CompanyEmployeeTaxes.Add(companyEmployeeTax);


                var result = _context.SaveChanges();

                transaction.Commit();
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_INSERT_SUCCESS);
            }
            catch (Exception)
            {
                transaction.Rollback();
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_INSERT_FAILED);
            }
        }


        public ResponseWithStatus<DataResponse<EndMonthDataSelect>> SelectEndMonthData(int employeeId)
        {
            DateTime now = DateTime.Now;
            int year = now.Year;
            int month = now.Month;
            int maxDays = DateTime.DaysInMonth(year, month);

            var schedule = _context.Schedules
                .Where(x => x.EmployeeId == employeeId)
                //.Where(x => 
                //    x.CreationDate.Year == year && x.CreationDate.Month == month && 
                //    x.CreationDate.Day > 1 && x.CreationDate.Day <= maxDays
                //)
                .Where(x => x.CreationDate.Year == year && x.CreationDate.Month == month)
                .FirstOrDefault();


            var income = _context.Incomes
                .Where(x => x.EmployeeId == employeeId)
                .Where(x =>
                    x.CreationDate.Year == year && x.CreationDate.Month == month
                )
                .FirstOrDefault();

            var companyEmployeeTax = _context.CompanyEmployeeTaxes
                .Where(x => x.EmployeeId == employeeId)
                .Where(x =>
                    x.CreationDate.Year == year && x.CreationDate.Month == month
                )
                .FirstOrDefault();


            if (schedule == null && income == null && companyEmployeeTax == null)
            {
                return ResponseBuilder.CreateDataResponseWithStatus<EndMonthDataSelect>(HttpStatusCode.OK, MessageConstants.MESSAGE_RECORD_NOT_FOUND, null!);
            }


            var scheduleIncome = new EndMonthDataSelect
            {
                Income = income,
                Schedule = schedule,
                CompanyEmployeeTax = companyEmployeeTax
               
            };

            return ResponseBuilder.CreateDataResponseWithStatus<EndMonthDataSelect>(HttpStatusCode.OK, MessageConstants.MESSAGE_RECORD_NOT_FOUND, scheduleIncome);
        }


        public ResponseWithStatus<Response> FinishMonth()
        {
            var date = new DateOnly();
            EndMonth endCurrentMonth = new EndMonth
            {
                Id = 0,
                CreationDate = date,
                Month = date.Month,
                Year = date.Year,
                IsFinished = true,
            };

            _context.EndMonths.Add(endCurrentMonth);
            var result = _context.SaveChanges();

            if (result == 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_INSERT_FAILED);
            }

            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_INSERT_SUCCESS);
        }




        public ResponseWithStatus<DataResponse<Boolean>> IsFilledAllEmployeesMonthData()
        {
            DateTime now = DateTime.Now;
            int year = now.Year;
            int month = now.Month;
            int maxDays = DateTime.DaysInMonth(year, month);

            var employeesCount = _context.Employees.Count();

            var schedules = _context.Schedules
                .Where(x => x.CreationDate.Year == year && x.CreationDate.Month == month)
                .ToList()
                .Count;

            var incomes = _context.Incomes
                .Where(x => x.CreationDate.Year == year && x.CreationDate.Month == month)
                .ToList()
                .Count;

            var companyEmployeeTaxes = _context.CompanyEmployeeTaxes
                .Where(x => x.CreationDate.Year == year && x.CreationDate.Month == month)
                .ToList()
                .Count;


            if (employeesCount < schedules || employeesCount < incomes || employeesCount < companyEmployeeTaxes) {
                return ResponseBuilder.CreateDataResponseWithStatus<Boolean>(HttpStatusCode.OK, MessageConstants.END_MONTH_DATA_NOT_FILLED, false);
            }

            return ResponseBuilder.CreateDataResponseWithStatus<Boolean>(HttpStatusCode.OK, MessageConstants.END_MONTH_DATA_IS_FILLED, true);
        }
    }
}
