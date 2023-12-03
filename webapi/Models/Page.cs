namespace webapi.Models
{
    public record PageRequest
    {
        public required int PageNumber { get; set; }
        public required int PageSize { get; set; }
    }

    public record PageFilterInfo
    {
        public required int PageNumber { get; set; }
        public required int PageSize { get; set; }
        public required string FilterValue { get; set; }

    }
}
