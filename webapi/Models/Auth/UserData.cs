using webapi.Models.HR;

namespace webapi.Models.Auth
{
    public class UserData
    {
        public required Company Company { get; set; }
        public required AuthTokens Tokens { get; set; }
    }
}
