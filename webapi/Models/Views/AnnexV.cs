using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models.Views
{
    public class AnnexV
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
    }
}
