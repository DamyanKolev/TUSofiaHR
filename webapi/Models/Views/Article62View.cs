namespace webapi.Models.Views
{
    public class Article62View
    {
        public int ContractId { get; set; }
        public required string EmployeeName { get; set;}
        public bool Article62Flag { get; set;}
        public required string FirstName { get; set;}
        public required string MiddleName { get; set;}
        public required string Surname { get; set;}
        public required string IdentityText { get; set;}
        public Int16 IdentityCode { get; set;}
        public string? WorkingWage { get; set;}
        public required string CompanyEic { get; set;}
        public DateOnly ConclusionDate { get; set;}
        public DateOnly ExecutionDate { get; set;}
        public Nullable<DateOnly> ContractTerm { get; set;}
        public Nullable<DateOnly> AdditionalAgreementDate { get; set;}
        public Nullable<DateOnly> TerminationDate { get; set;}
        public string? Nkpd { get; set;}
        public string? Nkid { get; set;}
        public required string ContractTypeCode { get; set;}
        public string? TerminationCode { get; set;}
        public Int16 CodeCorection { get; set;}
        public Int16 DocumentCode { get; set;}
        public string? Ekatte { get; set;}
        public bool IsTerminate { get; set;}
    }
}
