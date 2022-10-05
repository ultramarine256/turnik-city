namespace Domain.Modules.Authorization.Models
{
    public class TokenResponse
    {
        public string Token { get; set; }
        public string TokenType { get; set; }
        public DateTime ExpireDateTimeUtc { get; }

        public TokenResponse(string token, string tokenType, DateTime expireDateTimeUtc)
        {
            Token = token;
            TokenType = tokenType;
            ExpireDateTimeUtc = expireDateTimeUtc;
        }
    }
}
