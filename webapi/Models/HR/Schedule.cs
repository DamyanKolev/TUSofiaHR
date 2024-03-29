using System.ComponentModel.DataAnnotations;

namespace webapi.Models.HR
{
    public class Schedule
    {
        [Key]
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public Employee? Employee { get; set; }
        public Int16 InsuranceDays { get; set; }
        public Int16 InsuranceExperienceDays { get; set; }
        public Int16 IncapacityDays { get; set; }
        public Int16 ChildcareDays { get; set; }
        public Int16 WithoutInsuranceDays { get; set; }
        public Int16 UnpaidLeaveDays { get; set; }
        public Int16 PaidIncapacityDays { get; set; }
        public Int16 WorkedHours { get; set; }
        public Int16 OvertimeHours { get; set; }
        public DateOnly CreationDate { get; set; }
    }

    public class ScheduleDTO
    {
        public int EmployeeId { get; set; }
        public Employee? Employee { get; set; }
        public Int16 InsuranceDays { get; set; }
        public Int16 InsuranceExperienceDays { get; set; }
        public Int16 IncapacityDays { get; set; }
        public Int16 ChildcareDays { get; set; }
        public Int16 WithoutInsuranceDays { get; set; }
        public Int16 UnpaidLeaveDays { get; set; }
        public Int16 PaidIncapacityDays { get; set; }
        public Int16 WorkedHours { get; set; }
        public Int16 OvertimeHours { get; set; }
    }
}
