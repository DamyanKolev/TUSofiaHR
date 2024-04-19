namespace webapi.Models.HR
{
    public record ScheduleIncomeInsert
    {
        public required IncomeDTO Income { get; set; }
        public required ScheduleDTO Schedule { get; set; }
    }
    public record ScheduleIncomeSelect
    {
        public Income? Income { get; set; }
        public Schedule? Schedule { get; set; }
    }
}
