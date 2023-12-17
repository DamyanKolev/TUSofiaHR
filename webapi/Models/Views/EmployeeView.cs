namespace webapi.Models.Views
{
    public record EmployeeView
    {
        public int EmployeeId { get; set; }
        public required string FirstName { get; set; }
        public required string MiddleName { get; set; }
        public required string Surname { get; set; }
        public required decimal WorkingWage { get; set; }
        public int CompanyEmployeeId { get; set; }
        public string? ManagerFirstName { get; set; }
        public required string DepartmentName { get; set; }
        public required string PositionName { get; set; }
        public required string StatePositionName { get; set; }
    }
}
