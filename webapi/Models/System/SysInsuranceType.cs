using System.ComponentModel.DataAnnotations;

namespace webapi.Models.System
{
    public class SysInsuranceType
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(2)]
        public required string Code { get; set; }
        public required string InsuranceType { get; set; }
        public required List<decimal> HealthInsuranceArticle40 { get; set; }
        public required List<decimal> DooWithouthTzpbInsurer { get; set; }
        public required List<decimal> DooWithouthTzpbEmployee { get; set; }
        public required List<decimal> HealthInsuranceInsurer { get; set; }
        public required List<decimal> HealthInsuranceEmployee { get; set; }
        public required List<decimal> TeacherPensionFund { get; set; }
        public required List<decimal> ProfessionalPensionFund { get; set; }
        public required List<decimal> UniversalPensionInsurer { get; set; }
        public required List<decimal> UniversalPensionEmployee { get; set; }
        public required List<decimal> HealthInsurance { get; set; }
        public decimal GvrcFund { get; set; }
    }
}
