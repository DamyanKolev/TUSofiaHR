namespace webapi.Models.Views
{
    public class ContractView
    {
        public Int64 ContractId { get; set; }
        public required decimal WorkingWage { get; set; }
        public Int16 WorkTime { get; set; }
        public Int16 AnnualLeave { get; set; }
        public required string CompanyName { get; set; }
        public required string CompanyEIC { get; set; }
        public required DateOnly ConclusionDate { get; set; }
        public required DateOnly ExecutionDate { get; set; }
        public DateOnly? ContractTerm { get; set; }
        public DateOnly? AdditionalAgreementDate { get; set; }
        public DateOnly? TerminationDate { get; set; }
        public DateOnly? ChangeDate { get; set; }
        public required string StatePositionName { get; set; }
        public required string ActivityName { get; set; }
        public required string ContractType { get; set; }
        public required Int16 CodeCorection { get; set; }
        public required string DocumentType { get; set; }
        public required string Ekatte { get; set; }
        public required Boolean Article62Flag { get; set; }
    }
}
