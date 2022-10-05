namespace Domain.Modules.Authorization.Models
{
    public class TokenRequest
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string GrantType { get; set; }
        public string Scope { get; set; }
    }
}
