using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models.Views
{
    public class EmployeeV
    {
        public long EmployeeId { get; set; }
        public required string EmployeeName {get; set;}
        public required string Email {get; set;}
        public required string PhoneNumber {get; set;}
        public string? ManagerName {get; set;}
        public required string DepartmentName {get; set;}
        public string? PositionName {get; set;}
        public long PersonalDataId {get; set;}
        public long? ManagerId {get; set;}
        public long DepartmentId {get; set;}
        public long CompanyId {get; set;}
        public long PositionId {get; set;}
        [Column("article123_flag")]
        public bool? Article123Flag {get; set;}
        public long ContractId {get; set;}
    }
}
