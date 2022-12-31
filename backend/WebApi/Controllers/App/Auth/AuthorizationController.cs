using Domain.DomainServices.Authorization;
using Domain.DomainServices.Authorization.Models;
using Domain.Infrastructure.Authorization;
using Domain.Policy._Abstract;
using Domain.Session;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SendGrid;
using WebApi.Controllers.App.Auth.Json;
using WebApi.Infrastructure.Authorization.Token;

namespace WebApi.Controllers.App.Auth
{
    [Route("auth")]
    [Authorize]
    public class AuthorizationController : Controller
    {
        public IAppSession Session { get; }
        public IBearerTokenService TokenAuthorization { get; }
        public IPasswordEncryptor PasswordEncryptor { get; }
        public IAuthorizationDomainService Domain { get; }

        public AuthorizationController(
            IAppSession session,
            IBearerTokenService tokenAuthorization,
            IPasswordEncryptor passwordEncryptor,
            IAuthorizationDomainService domain)
        {
            Session = session;
            TokenAuthorization = tokenAuthorization;
            PasswordEncryptor = passwordEncryptor;
            Domain = domain;
        }

        [HttpPost("token")]
        [AllowAnonymous]
        public async Task<IActionResult> CreateJwtToken([FromBody] TokenRequest request)
        {
            var details = await Domain.GetUserByEmail(request.Login.ToLower().Trim(), request.Password.Trim());
            var user = details.User;

            // user not found
            if (user == null)
            {
                return Unauthorized(new { status = "wrong-password", data = "" });
            }

            var tokenString = TokenAuthorization.CreateToken(
                user.Email,
                user.ImageUrl,
                $"{user.FirstName?.Trim()} {user.LastName?.Trim()}",
                user.Role,
                PolicyExtensions.GetRolePermissions(user.Role));

            var data = new TokenResponse(tokenString, TOKEN_TYPE.BEARER, DateTime.Now.AddDays(32));

            return Ok(new { status = "ok", data });
        }

        [HttpPost("registration")]
        [AllowAnonymous]
        public async Task<IActionResult> Registration([FromBody] RegistrationRequest request)
        {
            if (await Domain.IsUserExist(request.Email))
            {
                return Unauthorized(new { status = "email-already-exist" });
            }

            await Domain.RegisterNewUser(request.Email, request.Password);
            return Ok(new { status = "ok" });
        }

        [HttpPost("confirmation-email")]
        [AllowAnonymous]
        public Task<Response> SendConfirmationEmail([FromBody] ConfirmationEmailRequest request)
            => Domain.SendConfirmationEmail(request.Email);

        [HttpPost("validate-code")]
        [AllowAnonymous]
        public async Task<IActionResult> ValidateConfirmationCode([FromBody] ConfirmationCodeRequest request)
        {
            if (await Domain.ValidateConfirmationCode(request.Email, request.Code))
            {
                return Ok(new { status = "ok" });
            }
            return Unauthorized(new { status = "wrong-code" });
        }

        [HttpGet("identity-info")]
        public Task<IdentityInfo> GetIdentityInfoAsync()
            => Domain.GetUserIdentityInfo(Session.TokenClaims.Email);
    }
}
