namespace webapi.Models.HR
{
    public class Company
    {
        public int Id { get; set; }
        public string CompanyName {  get; set; }
        public string CompanyEIC { get; set; }
    }

    public struct CompanyInsertRequest
    {
        public string CompanyName { get; set; }
        public string CompanyEIC { get; set; }
    }

    public struct CompanyUpdate
    {
        public string CompanyName { get; set; }
        public string CompanyEIC { get; set; }
    }

    public struct CompanyUpdateRequest
    {
        public Int64 UpdateId { get; set; }
        public PersonalDataUpdate Data { get; set; }
    }
}
