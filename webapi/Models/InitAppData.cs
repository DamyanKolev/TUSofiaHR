using webapi.Models.HR;

namespace webapi.Models
{
    public record InitAppData
    {
        public required PositionDTO PositionInsert {  get; set; }
        public required DepartmentDTO DepartmentInsert { get; set; }
        public required DepartmentTeamInsert DepartmentTeamInsert { get; set; }
    }
}
