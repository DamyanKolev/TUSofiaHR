using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.JsonPatch;
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

    public record ContractDTO
    {
        public decimal WorkingWage { get; set; }
        public Int16 WorkTime { get; set; }
        public Int16 AnnualLeave { get; set; }
        public DateOnly ConclusionDate { get; set; }
        public DateOnly ExecutionnDate { get; set; }
        public DateOnly ContractTerm { get; set; }
        public DateOnly AdditionalAgreementDate { get; set; }
        public DateOnly TerminationDate { get; set; }
        public DateOnly ChangeDate { get; set; }
        public Company? Company { get; set; }
        public SysContractType? ContractType { get; set; }
        public SysPosition? Position { get; set; }
        public SysIconomicActivity? IconomicActivity { get; set; }
        //public SysContractDocumentType? DocumentType { get; set; }
        public SysContractTerminationType? TerminationType { get; set; }
        public SysAdministrativeTerritory? AdministrativeTerritory { get; set; }
        public Int16 CodeCorection { get; set; }
        public Boolean Article62Flag { get; set; }
    }
    public record ContractUpdateDTO
    {
        public Int64 UpdateId { get; set; }
        public required JsonPatchDocument<ContractDTO> Contract { get; set; }
    }
}
