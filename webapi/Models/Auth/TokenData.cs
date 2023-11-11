namespace webapi.Models.Auth
{
    public class TokenData
    {
        public string Token { get; set; }
        public DateTime Expiration {  get; set; }

        public TokenData(string token, DateTime expiration) {
            Token = token;
            Expiration = expiration;
        }
    }
}
