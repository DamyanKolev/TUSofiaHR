namespace webapi.Models.HR
{
    public class Company
    {
        public int Id { get; set; }
        public required string CompanyName { get; set; }
        public required string CompanyEic { get; set; }
    }


    public class CompanyDTO
    {
        public required string CompanyName { get; set; }
        public required string CompanyEic { get; set; }
    }
}
