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
        public ResponseWithStatus<Response> UpdateEmployeeEndMonth(EndMonthDataUpdate employeeEndMonthUpdate);

        public ResponseWithStatus<DataResponse<EndMonthDataUpdate>> SelectEndMonthData(int employeeId);
        public ResponseWithStatus<Response> FinishMonth();
        public ResponseWithStatus<DataResponse<Boolean>> IsMonthFinished();

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


        int GetWorkingDaysInMonth()
        {
            DateTime now = DateTime.Now;
            int month = now.Month;
            int year = now.Year;
            // Проверка за валидни месеци
            if (month < 1 || month > 12)
            {
                throw new ArgumentException("Невалиден месец.");
            }

            // Изчисляване на броя дни в месеца
            int daysInMonth = DateTime.DaysInMonth(year, month);

            // Изчисляване на броя работни дни
            int workingDays = 0;
            for (int day = 1; day <= daysInMonth; day++)
            {
                DateTime date = new DateTime(year, month, day);
                if (date.DayOfWeek != DayOfWeek.Saturday && date.DayOfWeek != DayOfWeek.Sunday)
                {
                    workingDays++;
                }
            }

            return workingDays;
        }


        void CalculatePaymentAndInsuranceData(ref Income income, Schedule schedule)
        {
            var contract = (from ec in _context.Set<EmployeeContracts>()
                            join c in _context.Set<Contract>() on ec.ContractId equals c.Id
                            join emp in _context.Set<Employee>() on ec.EmployeeId equals emp.Id
                            where ec.EmployeeId == schedule.EmployeeId && ec.IsActive
                            select c).FirstOrDefault();


            var workingDays = GetWorkingDaysInMonth();
            var payPerDay = Decimal.Divide(contract!.WorkingWage ?? 0, workingDays);
            var payPerHour = Decimal.Divide(payPerDay, 8);


            var totalDayPayed = Decimal.Multiply(schedule.InsuranceDays, payPerDay);
            var total = Decimal.Add(totalDayPayed, income.AdditionalIncome);
            total = Decimal.Add(total, income.BonusIncome);

            income.GrossRemuneration = total;
            income.HealthInsurance = total;
            income.HealtInsuranceArt40 = total;
            income.TotalInsurance = total;
        }


        public ResponseWithStatus<Response> EndMonth(EndMonthDataInsert insertDTO)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var schedule = _mapper.Map<Schedule>(insertDTO.Schedule);
                var income = _mapper.Map<Income>(insertDTO.Income);
                var companyEmployeeTax = _mapper.Map<CompanyEmployeeTax>(insertDTO.CompanyEmployeeTax);
                CalculatePaymentAndInsuranceData(ref income, schedule);

                _context.Schedules.Add(schedule);
                _context.Incomes.Add(income);
                _context.CompanyEmployeeTaxes.Add(companyEmployeeTax);


                var result = _context.SaveChanges();

                transaction.Commit();
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_INSERT_SUCCESS);
            }
            catch (Exception e)
            {
                transaction.Rollback();
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, e.Message);
            }
        }


        public ResponseWithStatus<Response> UpdateEmployeeEndMonth(EndMonthDataUpdate employeeEndMonthUpdate)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var income = employeeEndMonthUpdate.Income;
                CalculatePaymentAndInsuranceData(ref income, employeeEndMonthUpdate.Schedule);

                _context.Update(employeeEndMonthUpdate.Schedule);
                _context.Update(employeeEndMonthUpdate.Income);
                _context.Update(employeeEndMonthUpdate.CompanyEmployeeTax);

                
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


        public ResponseWithStatus<DataResponse<EndMonthDataUpdate>> SelectEndMonthData(int employeeId)
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


            if (schedule != null && income != null && companyEmployeeTax != null)
            {
                var scheduleIncome = new EndMonthDataUpdate
                {
                    Income = income,
                    Schedule = schedule,
                    CompanyEmployeeTax = companyEmployeeTax

                };

                return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_RECORD_NOT_FOUND, scheduleIncome);
            }
            else
            {
                return ResponseBuilder.CreateDataResponseWithStatus<EndMonthDataUpdate>(HttpStatusCode.OK, MessageConstants.MESSAGE_RECORD_NOT_FOUND, null!);
            }
        }


        public ResponseWithStatus<Response> FinishMonth()
        {
            var date = DateTime.Now;
            EndMonth endCurrentMonth = new EndMonth
            {
                Id = 0,
                CreationDate = new DateOnly(),
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


        public ResponseWithStatus<DataResponse<Boolean>> IsMonthFinished()
        {
            DateTime now = DateTime.Now;
            int year = now.Year;
            int month = now.Month;

            var endMonthInfo = _context.EndMonths
                .Where(x => x.Year == year && x.Month == month)
                .FirstOrDefault();


            if (endMonthInfo != null)
            {
                return ResponseBuilder.CreateDataResponseWithStatus<Boolean>(HttpStatusCode.OK, MessageConstants.END_MONTH_DATA_IS_FILLED, true);
            }
            return ResponseBuilder.CreateDataResponseWithStatus<Boolean>(HttpStatusCode.OK, MessageConstants.END_MONTH_DATA_NOT_FILLED, false);
        }
    }
}
