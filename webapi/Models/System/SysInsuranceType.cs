using System.ComponentModel.DataAnnotations;

namespace webapi.Models.System
{
    public record SysInsuranceType
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(2)]
        public required string Code { get; set; }
        public required string InsuranceType { get; set; }
        public required decimal[] HealthInsuranceArticle40 { get; set; }
        public required decimal[] DooWithouthTzpbInsurer { get; set; }
        public required decimal[] DooWithouthTzpbEmployee { get; set; }
        public required decimal[] HealthInsuranceInsurer { get; set; }
        public required decimal[] HealthInsuranceEmployee { get; set; }
        public required decimal[] TeacherPensionFund { get; set; }
        public required decimal[] ProfessionalPensionFund { get; set; }
        public required decimal[] UniversalPensionInsurer { get; set; }
        public required decimal[] UniversalPensionEmployee { get; set; }
        public required decimal[] HealthInsurance { get; set; }
        public decimal GvrcFund { get; set; }
        public decimal DodTax {get; set; }
    }
}
