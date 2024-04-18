namespace webapi.Models.HR
{
    public record Company
    {
        public int Id { get; set; }
        public required string CompanyName { get; set; }
        public required string CompanyEic { get; set; }
    }


    public record CompanyDTO
    {
        public required string CompanyName { get; set; }
        public required string CompanyEic { get; set; }
    }
}
