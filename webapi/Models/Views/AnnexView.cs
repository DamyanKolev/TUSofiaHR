namespace webapi.Models.Views
{
    public class AnnexView
    {
        public int ContractId { get; set; }
        public DateOnly ConclusionDate { get; set; }
        public DateOnly ExecutionDate { get; set; }
        public Nullable<DateOnly> ContractTerm { get; set; }
        public Nullable<DateOnly> AdditionalAgreementDate { get; set; }
        public Nullable<DateOnly> TerminationDate { get; set; }
        public string? PositionName { get; set; }
        public string? ActivityName { get; set; }
        public required string ContractType { get; set; }
        public required string DocumentType { get; set; }
        public string? Ekatte { get; set; }
        public string? Nkpd { get; set; }
        public string? Nkid { get; set; }
        public string? InsuranceTypeCode { get; set; }
        public required string ContractTypeCode { get; set; }
        public string? TerminationCode { get; set; }
        public bool IsTerminate { get; set; }
        public bool Article62Flag { get; set; }
    }
}
