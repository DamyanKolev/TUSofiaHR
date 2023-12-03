namespace webapi.Models.System
{
    public record SysContractDocumentType
    {
        public int Id { get; set; }
        public required String DocumentType { get; set; }
        public required Int16 Code { get; set; }
    }
}
