namespace WebApi.Controllers.App.Auth.Json
{
    public class TokenResponseDto
    {
        public string Token { get; set; }
        public string TokenType { get; set; }
        public DateTime ExpireDateTimeUtc { get; }

        public TokenResponseDto(string token, string tokenType, DateTime expireDateTimeUtc)
        {
            Token = token;
            TokenType = tokenType;
            ExpireDateTimeUtc = expireDateTimeUtc;
        }
    }
}
