using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using webapi.Models.System;

namespace webapi.Models.HR
{
    public record Contract
    {
        public int Id { get; set; }
        public Nullable<decimal> WorkingWage { get; set; }
        public Nullable<int> WorkTime { get; set; }
        public Nullable<Int16> AnnualLeave { get; set; }
        public string? AdditionalClause { get; set; }
        public DateOnly ConclusionDate { get; set; }
        public DateOnly ExecutionDate { get; set; }
        public Nullable<DateOnly> ContractTerm { get; set; }
        public Nullable<DateOnly> AdditionalAgreementDate { get; set; }
        public Nullable<DateOnly> TerminationDate { get; set; }
        public Nullable<DateOnly> ChangeDate { get; set; }


        public int ContractTypeId { get; set; }
        public SysContractType? ContractType { get; set; }


        public Nullable<int> SysPositionId { get; set; }
        public SysPosition? SysPosition { get; set; }


        public Nullable<int> SysIconomicActivityId { get; set; }
        public SysIconomicActivity? SysIconomicActivity { get; set; }


        public int DocumentTypeId { get; set; }
        public SysContractDocumentType? DocumentType { get; set; }


        public Nullable<int> TerminationTypeId { get; set; }
        public SysContractTerminationType? TerminationType { get; set; }


        public int SysAdministrativeTerritoryId { get; set; }
        public SysAdministrativeTerritory? SysAdministrativeTerritory { get; set; }


        [ForeignKey(nameof(ContractId))]
        public Nullable<int> ContractId { get; set; }
        [ForeignKey(nameof(ContractId))]
        public Contract? ParentContract { get; set; }


        public required string CompanyEic { get; set; }
        public required Int16 CodeCorection { get; set; }
        public Nullable<bool> IsTerminate {  get; set; }
        [Column("article62_flag")]
        public required bool Article62Flag {  get; set; }
        public required bool IsAnnex { get; set; }
        public DateOnly CreationDate { get; set; }
    }





    public record ContractDTO
    {
        public Nullable<decimal> WorkingWage { get; set; }
        public Nullable<int> WorkTime { get; set; }
        public Nullable<Int16> AnnualLeave { get; set; }
        public string? AdditionalClause { get; set; }
        public DateOnly ConclusionDate { get; set; }
        public DateOnly ExecutionDate { get; set; }
        public Nullable<DateOnly> ContractTerm { get; set; }
        public Nullable<DateOnly> AdditionalAgreementDate { get; set; }
        public Nullable<DateOnly> TerminationDate { get; set; }
        public Nullable<DateOnly> ChangeDate { get; set; }
        public int ContractTypeId { get; set; }
        public Nullable<int> SysPositionId { get; set; }
        public Nullable<int> SysIconomicActivityId { get; set; }
        public Int16 DocumentTypeId { get; set; }
        public Nullable<int> TerminationTypeId { get; set; }
        public Nullable<int> SysAdministrativeTerritoryId { get; set; }
        public required string CompanyEic { get; set; }
        public Nullable<int> ContractId { get; set; }
        public Int16 CodeCorection { get; set; }
        public bool Article62Flag { get; set; }
        public bool IsAnnex { get; set; }
    }
}
