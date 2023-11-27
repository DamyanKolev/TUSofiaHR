namespace webapi.Models.HR
{
    public class Contract
    {
        public Int64 Id { get; set; }
        public required decimal WorkingWage { get; set; }
        public required Int16 WorkTime { get; set; }
        public required DateOnly ConclusionDate { get; set; }
    }

    public struct ContractInsertRequest
    {
        public decimal WorkingWage { get; set; }
        public Int16 WorkTime { get; set; }
        public DateOnly ConclusionDate { get; set; }
    }

    public struct ContractUpdate
    {
        public decimal WorkingWage { get; set; }
        public Int16 WorkTime { get; set; }
        public DateOnly ConclusionDate { get; set; }
    }

    public struct ContractUpdateRequest
    {
        public Int64 UpdateId { get; set; }
        public ContractUpdate Data { get; set; }
    }
}
