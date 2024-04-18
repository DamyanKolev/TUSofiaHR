namespace webapi.Models.Views
{
    public class DepartmentTeamV
    {
        public int Id { get; set; }
        public required string TeamName { get; set; }
        public string? ManagerName { get; set; }
        public required string ddepartmentName { get; set; }
    }
}
