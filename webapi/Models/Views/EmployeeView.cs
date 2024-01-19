namespace webapi.Models.Views
{
    public record EmployeeView
    {
        public long EmployeeId { get; set; }
        public required string EmployeeName { get; set; }
        public required string Email { get; set; }
        public required string PhoneNumber { get; set; }
        public string? ManagerName { get; set; }
        public required string DepartmentName { get; set; }
        public required string PositionName { get; set; }
        public long PersonalDataId {get; set;}
        public long? ContractId {get; set;}
    }
}
