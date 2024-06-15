namespace webapi.Models.HR
{
    public record EndMonthDataInsert
    {
        public required IncomeDTO Income { get; set; }
        public required ScheduleDTO Schedule { get; set; }
        public required CompanyEmployeeTaxDTO CompanyEmployeeTax { get; set; }
    }
    public record EndMonthDataUpdate
    {
        public required Income Income { get; set; }
        public required Schedule Schedule { get; set; }
        public required CompanyEmployeeTax CompanyEmployeeTax { get; set; }
    }
}
