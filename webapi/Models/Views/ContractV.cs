using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json.Linq;

namespace webapi.Models.Views
{
    public class ContractV
    {
        public int ContractId { get; set; }
        public int EmployeeId { get; set; }
        public required DateOnly ConclusionDate { get; set; }
        public required DateOnly ExecutionDate { get; set; }
        public DateOnly? ContractTerm { get; set; }
        public string? Ekatte { get; set; }
        public string? Nkpd { get; set; }
        public string? Nkid { get; set; }
        public required string ContractTypeCode { get; set; }
        public string? TerminationCode { get; set; }
        public bool IsTerminate { get; set; }
        [Column("article62_flag")]
        public bool Article62Flag { get; set; }
        [Column(TypeName = "jsonb")]
        public required IList<AnnexV> Annexes { get; set; }
    }



    //public class ContractV
    //{
    //    public int ContractId { get; set; }
    //    public int EmployeeId { get; set; }
    //    public required DateOnly ConclusionDate { get; set; }
    //    public required DateOnly ExecutionDate { get; set; }
    //    public DateOnly? ContractTerm { get; set; }
    //    public DateOnly? AdditionalAgreementDate { get; set; }
    //    public DateOnly? TerminationDate { get; set; }
    //    public string? PositionName { get; set; }
    //    public string? ActivityName { get; set; }
    //    public required string ContractType { get; set; }
    //    public required string DocumentType { get; set; }
    //    public string? Ekatte { get; set; }
    //    public string? Nkpd { get; set; }
    //    public string? Nkid { get; set; }
    //    public required string ContractTypeCode { get; set; }
    //    public string? TerminationCode { get; set; }
    //    public bool IsTerminate { get; set; }
    //    [Column("article62_flag")]
    //    public bool Article62Flag { get; set; }
    //    [Column(TypeName = "jsonb")]
    //    public required IList<AnnexV> Annexes { get; set; }
    //}
}
