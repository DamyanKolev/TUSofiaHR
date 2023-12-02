namespace webapi.Models.Auth
{
    public record LoginModel
    {
        public required string Username { get; set;}
        public required string Password { get; set;}
    }
}
