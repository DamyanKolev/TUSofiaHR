using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace webapi.Models.HR
{
    public record Department
    {
        [Key]
        public int Id { get; set; }
        public required string DepartmentName { get; set; }
        public string? Description { get; set; }
        public Nullable<int> ManagerId { get; set; }
        public Employee? Manager { get; set; }
    }

    public record DepartmentInsert
    {
        public required string DepartmentName { get; set; }
        public string? Description { get; set; }
        public Nullable<int> ManagerId { get; set; }
    }
}
