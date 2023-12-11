using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.JsonPatch;
using webapi.Models.System;

namespace webapi.Models.HR
{
    public record Contract
    {
        [Key]
        public Int64 Id { get; set; }
        [NotNull]
        public required decimal WorkingWage { get; set; }
        [NotNull]
        public required Int16 WorkTime { get; set; }
        [NotNull]
        public required Int16 AnnualLeave { get; set; }
        [NotNull]
        public required DateOnly ConclusionDate { get; set; }
        [NotNull]
        public required DateOnly ExecutionnDate { get; set; }
        public DateOnly ContractTerm { get; set; }
        public DateOnly AdditionalAgreementDate { get; set; }
        public DateOnly TerminationDate { get; set; }
        public DateOnly ChangeDate { get; set; }


        [NotNull]
        public int CompanyId { get; set; }
        public required Company Company { get; set; }


        [NotNull]
        public int ContractTypeId { get; set; }
        public required SysContractType ContractType { get; set; }


        [NotNull]
        public int PositionId { get; set; }
        public required SysPosition Position { get; set; }


        [NotNull]
        public int IconomicActivityId { get; set; }
        public required SysIconomicActivity IconomicActivity { get; set; }


        [NotNull]
        public int? DocumentTypeId { get; set; }
        public SysContractDocumentType? DocumentType { get; set; }

        public int? TerminationTypeId { get; set; }
        public SysContractTerminationType? TerminationType { get; set; }

        public int? AdministrativeTerritoryId { get; set; }
        public SysAdministrativeTerritory? AdministrativeTerritory { get; set; }


        [NotNull]
        public required Int16 CodeCorection { get; set; }
        [NotNull]
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
        public SysContractDocumentType? DocumentType { get; set; }
        public int TerminationTypeId { get; set; }
        public int AdministrativeTerritoryId { get; set; }
        public required Int16 CodeCorection { get; set; }
        public required Boolean Article62Flag { get; set; }
    }





    public record ContractUpdateDTO
    {
        public required Int64 UpdateId { get; set; }
        public required JsonPatchDocument<ContractDTO> Contract { get; set; }
    }
}
