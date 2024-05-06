using webapi.Models.System;

namespace webapi.Models.HR
{
    public record CompanyEmployeeTax
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public Employee? Employee { get; set; }
        public int SysPaymentTypeId { get; set; }
        public SysPaymentType? SysPaymentType { get; set; }
        public DateOnly DisbursementAccrualDate { get; set; }
        public DateOnly CreationDate { get; set; }
    }

    public class CompanyEmployeeTaxDTO
    {
        public int EmployeeId { get; set; }
        public int SysPaymentTypeId { get; set; }
        public DateOnly DisbursementAccrualDate { get; set; }
    }
}
