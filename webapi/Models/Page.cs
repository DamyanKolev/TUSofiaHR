namespace webapi.Models
{
    public record PageRequest
    {
        public required int PageNumber { get; set; }
        public required int PageSize { get; set; }
    }
}
