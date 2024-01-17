using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models.Views
{
    public class EmployeeV
    {
        public int EmployeeId { get; set; }
        public required string EmployeeName {get; set;}
        public required string Email {get; set;}
        public required string PhoneNumber {get; set;}
        public string? ManagerName {get; set;}
        public required string DepartmentName {get; set;}
        public string? PositionName {get; set;}
        public int PersonalDataId {get; set;}
        public int? ManagerId {get; set;}
        public int DepartmentId {get; set;}
        public int CompanyId {get; set;}
        public int PositionId {get; set;}
        [Column("article123_flag")]
        public bool? Article123Flag {get; set;}
        public int ContractId {get; set;}
    }
}
