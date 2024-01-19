namespace webapi.Models
{
    public record PageInfo
    {
        public required int PageNumber { get; set; }
        public required int PageSize { get; set; }
    }

    public record PageFilterInfo
    {
        public required int PageNumber { get; set; }
        public required int PageSize { get; set; }
        public required Filter Filter { get; set; }

    }

    public record struct PageResponse<T> (
        int Pages, int CountRecords, List<T> Records
    );

}
