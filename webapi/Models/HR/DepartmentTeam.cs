namespace webapi.Models.HR
{
    public class DepartmentTeam
    {
        public int Id { get; set; }
        public required string TeamName { get; set; }
        public int DepartmentId { get; set; }
        public Department? Department { get; set; }
        public Nullable<int> ManagerId { get; set; }
        public Employee? Manager { get; set; }
    }


    public record DepartmentTeamInsert
    {
        public required string TeamName { get; set; }
        public int DepartmentId { get; set; }
        public Nullable<int> ManagerId { get; set; }
    }
}
