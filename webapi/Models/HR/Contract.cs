using System.ComponentModel.DataAnnotations;
using webapi.Models.System;

namespace webapi.Models.HR
{
    public class Contract
    {
        [Key]
        public Int64 Id { get; set; }
        [Required]
        public decimal WorkingWage { get; set; }
        [Required]
        public Int16 WorkTime { get; set; }
        [Required]
        public Int16 AnnualLeave { get; set; }
        [Required]
        public DateOnly ConclusionDate { get; set; }
        [Required]
        public DateOnly ExecutionnDate { get; set; }
        public DateOnly ContractTerm { get; set; }
        public DateOnly AdditionalAgreementDate { get; set; }
        public DateOnly TerminationDate { get; set; }
        public DateOnly ChangeDate { get; set; }
        [Required]
        public Company? Company { get; set; }
        [Required]
        public SysContractType? ContractType { get; set; }
        [Required]
        public SysPosition? Position { get; set; }
        [Required]
        public SysIconomicActivity? IconomicActivity { get; set; }
        //[Required]
        //public SysContractDocumentType? DocumentType { get; set; }
        public SysContractTerminationType TerminationType { get; set; }
        public SysAdministrativeTerritory AdministrativeTerritory { get; set; }
        [Required]
        public Int16 CodeCorection { get; set; }
        [Required]
        public Boolean Article62Flag {  get; set; }
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
