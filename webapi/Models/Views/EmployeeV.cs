namespace webapi.Models.Views
{
    public record EmployeeV
    {
        public long EmployeeId { get; set; }
        public required string EmployeeName { get; set; }
        public required string Email { get; set; }
        public required string PhoneNumber { get; set; }
        public string? ManagerName { get; set; }
        public required string TeamName { get; set; }
        public required string PositionName { get; set; }
        public required string DepartmentName { get; set; }
        public required string IdentityText { get; set; }
        public string? Gender { get; set; }
        public string? InsuranceTypeCode {get; set; }
        public int PersonalDataId {get; set;}
    }
}
