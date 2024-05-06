using webapi.Models.HR;
using webapi.Models;
using AutoMapper;
using System.Net;
using webapi.Constants;

namespace webapi.Services.HR
{
    public interface IEndMonthService
    {
        public ResponseWithStatus<Response> EndMonth(EndMonthDataInsert insertDTO);
        public ResponseWithStatus<DataResponse<EndMonthDataSelect>> SelectEndMonthData(int employeeId);

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
    }
}
