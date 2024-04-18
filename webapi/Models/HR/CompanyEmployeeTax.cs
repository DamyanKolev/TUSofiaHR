namespace webapi.Models.HR
{
    public record CompanyEmployeeTax
    {
        public int EmployeeId { get; set; }
        public Int16 PaymentTypeCode { get; set; }
        public DateOnly DisbursementAccrualDate { get; set; }
    }
}
