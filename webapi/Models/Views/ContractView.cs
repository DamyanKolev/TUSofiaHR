namespace webapi.Models.Views
{
    public class ContractView
    {
        public int EmployeeId { get; set; }
        public required string EmployeeName { get; set; }
        public required string Email { get; set; }
        public required string PhoneNumber { get; set; }
        public string? ManagerName { get; set; }
        public required string DepartmentName { get; set; }
        public string? PositionName { get; set; }
        public string? InsuranceTypeCode { get; set; }
        public int personalDataId { get; set; }
    }
}
