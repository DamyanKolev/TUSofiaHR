using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace webapi.Models.HR
{
    public record Department
    {
        [Key]
        public int Id { get; set; }
        [NotNull]
        public required string DepartmentName { get; set; }
    }


    public record DepartmentInsert
    {
        public required string DepartmentName { get; set; }
    }
}
