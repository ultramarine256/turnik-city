namespace WebApi.Controllers.App.Auth.Json
{
    public class TokenRequestDto
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string GrantType { get; set; }
        public string Scope { get; set; }
    }
}
