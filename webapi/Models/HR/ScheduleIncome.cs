namespace webapi.Models.HR
{
    public class ScheduleIncome
    {
        public required IEnumerable<IncomeDTO> Incomes { get; set; }
        public required IEnumerable<ScheduleDTO> Schedules { get; set; }
    }
}
