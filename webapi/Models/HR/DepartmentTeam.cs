using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models.HR
{
    public class DepartmentTeam
    {
        public int Id { get; set; }
        public required string TeamName { get; set; }
        public int DepartmentId { get; set; }
        public Department? Department { get; set; }
        [ForeignKey(nameof(ManagerId))]
        public Nullable<int> ManagerId { get; set; }
        [ForeignKey(nameof(ManagerId))]
        public virtual Employee? Manager { get; set; }

    }


    public record DepartmentTeamInsert
    {
        public required string TeamName { get; set; }
        public int DepartmentId { get; set; }
        public Nullable<int> ManagerId { get; set; }
    }
}
