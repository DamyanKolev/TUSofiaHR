namespace webapi.Models.HR
{
    public record EndMonthDataInsert
    {
        public required IncomeDTO Income { get; set; }
        public required ScheduleDTO Schedule { get; set; }
        public required CompanyEmployeeTaxDTO CompanyEmployeeTax { get; set; }
    }
    public record EndMonthDataSelect
    {
        public Income? Income { get; set; }
        public Schedule? Schedule { get; set; }
        public CompanyEmployeeTax? CompanyEmployeeTax { get; set; }
    }
}
