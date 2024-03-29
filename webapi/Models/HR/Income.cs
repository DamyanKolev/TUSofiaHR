using System.ComponentModel.DataAnnotations;

namespace webapi.Models.HR
{
    public class Income
    {
        [Key]
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public Employee? Employee { get; set; }
        public decimal HealtInsuranceArt40 { get; set; }
        public decimal TotalInsurance { get; set; }
        public decimal HealthInsurance { get; set; }
        public decimal GrossRemuneration { get; set; }
        public decimal BonusIncome { get; set; }
        public decimal AdditionalIncome { get; set; }
        public DateOnly CreationDate { get; set; }
    }


    public class IncomeDTO
    {
        public int EmployeeId { get; set; }
        public decimal HealtInsuranceArt40 { get; set; }
        public decimal TotalInsurance { get; set; }
        public decimal HealthInsurance { get; set; }
        public decimal GrossRemuneration { get; set; }
        public decimal BonusIncome { get; set; }
        public decimal AdditionalIncome { get; set; }
    }
}
