namespace webapi.Models.HR
{
    public class CompanyEmployeeTax
    {
        public int EmployeeId { get; set; }
        public Int16 PaymentTypeCode { get; set; }
        public DateOnly DisbursementAccrualDate { get; set; }
    }
}
