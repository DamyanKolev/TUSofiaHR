using System.ComponentModel.DataAnnotations;
using webapi.Models.System;

namespace webapi.Models.HR
{
    public class Insurance
    {
        [Key]
        public int Id { get; set; }
        public decimal DooWithouthTzpbInsurer { get; set; }
        public decimal DooWithouthTzpbEmployee { get; set; }
        public decimal HealthInsurance { get; set; }
        public decimal HealthInsuranceArticle40 { get; set; }
        public decimal HealthInsuranceInsurer { get; set; }
        public decimal HealthInsuranceEmployee { get; set; }
        public decimal TeacherPensionFund { get; set; }
        public decimal ProfessionalPensionFund { get; set; }
        public decimal UniversalPensionInsurer { get; set; }
        public decimal UniversalPensionEmployee { get; set; }
        public int InsuranceTypeId { get; set; }
        public SysInsuranceType? SysInsuranceTypeId { get; set; }
    }


    public class InsuranceDTO
    {
        public decimal DooWithouthTzpbInsurer { get; set; }
        public decimal DooWithouthTzpbEmployee { get; set; }
        public decimal HealthInsurance { get; set; }
        public decimal HealthInsuranceArticle40 { get; set; }
        public decimal HealthInsuranceInsurer { get; set; }
        public decimal HealthInsuranceEmployee { get; set; }
        public decimal TeacherPensionFund { get; set; }
        public decimal ProfessionalPensionFund { get; set; }
        public decimal UniversalPensionInsurer { get; set; }
        public decimal UniversalPensionEmployee { get; set; }
        public int InsuranceTypeId { get; set; }
    }
}
