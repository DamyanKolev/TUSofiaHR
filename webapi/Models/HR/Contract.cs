using System.ComponentModel.DataAnnotations;
using webapi.Models.System;

namespace webapi.Models.HR
{
    public record Contract
    {
        [Key]
        public Int64 Id { get; set; }
        [Required]
        public required decimal WorkingWage { get; set; }
        [Required]
        public required Int16 WorkTime { get; set; }
        [Required]
        public required Int16 AnnualLeave { get; set; }
        [Required]
        public required DateOnly ConclusionDate { get; set; }
        [Required]
        public required DateOnly ExecutionnDate { get; set; }
        public DateOnly ContractTerm { get; set; }
        public DateOnly AdditionalAgreementDate { get; set; }
        public DateOnly TerminationDate { get; set; }
        public DateOnly ChangeDate { get; set; }
        [Required]
        public required Company Company { get; set; }
        [Required]
        public required SysContractType ContractType { get; set; }
        [Required]
        public required SysPosition Position { get; set; }
        [Required]
        public required SysIconomicActivity IconomicActivity { get; set; }
        //[Required]
        //public SysContractDocumentType? DocumentType { get; set; }
        public SysContractTerminationType? TerminationType { get; set; }
        public SysAdministrativeTerritory? AdministrativeTerritory { get; set; }
        [Required]
        public required Int16 CodeCorection { get; set; }
        [Required]
        public required Boolean Article62Flag {  get; set; }
    }

    public record ContractInsertRequest
    {
        public decimal WorkingWage { get; set; }
        public Int16 WorkTime { get; set; }
        public DateOnly ConclusionDate { get; set; }
    }

    public record ContractUpdate
    {
        public decimal WorkingWage { get; set; }
        public Int16 WorkTime { get; set; }
        public DateOnly ConclusionDate { get; set; }
    }

    public record ContractUpdateRequest
    {
        public Int64 UpdateId { get; set; }
        public ContractUpdate Data { get; set; }
    }
}
