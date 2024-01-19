using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models.Views
{
    public class ContractV
    {
        public long ContractId { get; set; }
        public required string EmployeeName {get; set;}
        public required string FirstName {get; set;}
        public required string MiddleName {get; set;}
        public required string Surname {get; set;}
        public decimal WorkingWage {get; set;}
        public Int16 WorkTime {get; set;}
        public Int16 AnnualLeave {get; set;}
        public required string Egn {get; set;}
        public DateOnly ConclusionDate {get; set;}
        public DateOnly ExecutionDate {get; set;}
        public DateOnly? Contract_term {get; set;}
        public DateOnly? AdditionalAgreementDate {get; set;}
        public DateOnly? TerminationDate {get; set;}
        public required string CompanyEic {get; set;}
        public string? PositionName {get; set;}
        public required string NpkdId {get; set;}
        public required string ActivityName {get; set;}
        public required string NkidId {get; set;}
        public string? TerminationCode {get; set;}
        public string? Ekatte {get; set;}
        public required string ContractType {get; set;}
        public required string Contract_type_code {get; set;}
        public required string Document_type {get; set;}
        public Int16 DocumentCode {get; set;}
        public Int16 CodeCorection {get; set;}
        [Column("article62_flag")]
        public bool Article62Flag {get; set;}
        public bool IsTerminate {get; set;}
    }
}
