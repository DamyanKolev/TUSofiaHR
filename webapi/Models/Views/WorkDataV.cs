namespace webapi.Models.Views
{
    public class WorkDataV
    {
        public int EmployeeId {  get; set; }
        public required string EmployeeName {  get; set; }
        public required string WorkEmail {  get; set; }
        public required string PhoneNumber { get; set; }
        public string? PositionName { get; set; }
        public string? DepartmentName { get; set; }
        public string? PopulatedPlace { get; set; }
    }
}
