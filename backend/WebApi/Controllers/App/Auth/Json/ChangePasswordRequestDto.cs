namespace WebApi.Controllers.App.Auth.Json
{
    public class ChangePasswordRequestDto
    {
        public string NewPassword { get; set; }
        public string PasswordResetHash { get; set; }
    }
}
