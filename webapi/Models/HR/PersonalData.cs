namespace webapi.Models.HR
{
    public class PersonalData
    {
        public int Id { get; set; }
        public required string EGN { get; set; }
    }

    public struct PersonalDataInsertRequest
    {
        public string EGN { get; set; }
    }

    public struct PersonalDataUpdate
    {
        public string EGN { get; set; }
    }

    public struct PersonalDataUpdateRequest
    {
        public Int64 UpdateId { get; set; }
        public PersonalDataUpdate Data { get; set; }
    }
}
