using System.ComponentModel.DataAnnotations.Schema;
using webapi.Models.System;

namespace webapi.Models.HR
{
    public record Contract
    {
        public Int64 Id { get; set; }
        public required decimal WorkingWage { get; set; }
        public required Int16 WorkTime { get; set; }
        public required Int16 AnnualLeave { get; set; }
        public required DateOnly ConclusionDate { get; set; }
        public required DateOnly ExecutionDate { get; set; }
        public DateOnly? ContractTerm { get; set; }
        public DateOnly? AdditionalAgreementDate { get; set; }
        public DateOnly? TerminationDate { get; set; }
        public DateOnly? ChangeDate { get; set; }


        public int CompanyId { get; set; }
        public Company? Company { get; set; }


        public int ContractTypeId { get; set; }
        public SysContractType? ContractType { get; set; }


        public int PositionId { get; set; }
        public SysPosition? Position { get; set; }


        public int IconomicActivityId { get; set; }
        public SysIconomicActivity? IconomicActivity { get; set; }


        public int DocumentTypeId { get; set; }
        public SysContractDocumentType? DocumentType { get; set; }


        public int? TerminationTypeId { get; set; }
        public SysContractTerminationType? TerminationType { get; set; }


        public int? AdministrativeTerritoryId { get; set; }
        public SysAdministrativeTerritory? AdministrativeTerritory { get; set; }


        public required Int16 CodeCorection { get; set; }
        public required Boolean IsTerminate {  get; set; }
        [Column("article62_flag")]
        public required Boolean Article62Flag {  get; set; }
    }





    public record ContractDTO
    {
        public required decimal WorkingWage { get; set; }
        public required Int16 WorkTime { get; set; }
        public required Int16 AnnualLeave { get; set; }
        public required DateOnly ConclusionDate { get; set; }
        public required DateOnly ExecutionnDate { get; set; }
        public DateOnly? ContractTerm { get; set; }
        public DateOnly? AdditionalAgreementDate { get; set; }
        public DateOnly? TerminationDate { get; set; }
        public DateOnly? ChangeDate { get; set; }
        public required int CompanyId { get; set; }
        public required int ContractTypeId { get; set; }
        public required int PositionId { get; set; }
        public required int IconomicActivityId { get; set; }
        public int? DocumentTypeId { get; set; }
        public int TerminationTypeId { get; set; }
        public int AdministrativeTerritoryId { get; set; }
        public required Int16 CodeCorection { get; set; }
        public required Boolean IsTerminate {  get; set; }
        public required Boolean Article62Flag { get; set; }
    }
}
