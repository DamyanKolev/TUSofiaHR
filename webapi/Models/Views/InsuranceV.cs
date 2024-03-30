namespace webapi.Models.Views
{
    public class InsuranceV
    {
        public int EmployeeId { get; set; }
        public required string Surname { get; set; }
        public required string Email { get; set; }
        public required string PhoneNumber { get; set; }
        public required string Initials { get; set; }
        public required string IdentityText { get; set; }
        public DateOnly ExecutionDate { get; set; }
        public required string CompanyEic { get; set; }
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
        public decimal GvrcFund { get; set; }
        public decimal DodTax { get; set; }
        public required string NkpdGroup { get; set; }
        public required string Nkid { get; set; }
        public required string NkidSector { get; set; }
        public required decimal TzpbPercent { get; set; }
        public required string InsuranceTypeCode { get; set; }
    }
}
