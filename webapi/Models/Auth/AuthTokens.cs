namespace webapi.Models.Auth
{
    public record AuthTokens
    {
        public required string AccessToken { get; set; }
        public required string RefreshToken {  get; set; }
    }
}
