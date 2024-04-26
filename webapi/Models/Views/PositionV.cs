namespace webapi.Models.Views
{
    public class PositionV
    {
        public int Id { get; set; }
        public required string PositionName { get; set; }
        public string? Description { get; set; }
        public required string StatePositionName { get; set; }
        public required string Nkpd { get; set; }
    }
}
