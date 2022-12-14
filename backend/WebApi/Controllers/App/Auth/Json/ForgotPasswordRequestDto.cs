namespace WebApi.Controllers.App.Auth.Json
{
    public class ForgotPasswordRequestDto
    {
        public string Email { get; set; }
        public string PasswordResetPageUrl { get; set; }
    }
}
