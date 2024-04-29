using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using webapi.Models.Views;

namespace webapi.Models.HR
{
    public record Department
    {
        [Key]
        public int Id { get; set; }
        public required string DepartmentName { get; set; }
        public string? Description { get; set; }
        [ForeignKey(nameof(ManagerId))]
        public Nullable<int> ManagerId { get; set; }
        [ForeignKey(nameof(ManagerId))]
        public virtual Employee? Manager { get; set; }
        public Nullable<int> ParentId {get; set;}
        public Department? Parent {get; set;}
    }

    public record DepartmentDTO
    {
        public required string DepartmentName { get; set; }
        public string? Description { get; set; }
        public Nullable<int> ManagerId { get; set; }
        public Nullable<int> ParentId {get; set;}
    }
}
