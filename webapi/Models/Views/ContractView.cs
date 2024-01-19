namespace webapi.Models.Views
{
    public class ContractView
    {
        public long ContractId { get; set; }
        public required string EmployeeName { get; set; }
        public required DateOnly ConclusionDate { get; set; }
        public required DateOnly ExecutionDate { get; set; }
        public DateOnly? ContractTerm { get; set; }
        public DateOnly? AdditionalAgreementDate { get; set; }
        public DateOnly? TerminationDate { get; set; }
        public required string PositionName { get; set; }
        public required string ActivityName { get; set; }
        public required string ContractType { get; set; }
        public required string DocumentType { get; set; }
        public required string Ekatte { get; set; }
        public required Boolean Article62Flag { get; set; }
        public required Boolean IsTerminate { get; set; }

    }
}
