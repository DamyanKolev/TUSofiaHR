using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace webapi.Models.System
{
    public record SysContractDocumentType
    {
        [Key]
        public int Id { get; set; }
        [NotNull]
        public required Int16 Code { get; set; }
        [NotNull, StringLength(70)]
        public required String DocumentType { get; set; }
    }
}
