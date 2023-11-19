namespace WebApi.Controllers.App.Auth.Json
{
    public class ChangePasswordRequest
    {
        public string NewPassword { get; set; }
        public string PasswordResetHash { get; set; }
    }

    public class ForgotPasswordRequest
    {
        public string Email { get; set; }
        public string PasswordResetPageUrl { get; set; }
    }

    public class RegistrationRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class ConfirmationEmailRequest
    {
        public string Email { get; set; }
    }

    public class ConfirmationCodeRequest
    {
        public string Email { get; set; }
        public string Code { get; set; }
    }

    public class TokenRequest
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string GrantType { get; set; }
        public string Scope { get; set; }
    }

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
