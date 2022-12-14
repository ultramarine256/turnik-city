using Domain.DomainServices.Authorization;
using Domain.DomainServices.Authorization.Models;
using Domain.Infrastructure.Authorization;
using Domain.Policy._Abstract;
using Domain.Session;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> CreateJwtToken([FromBody] TokenRequestDto request)
        {
            var details = await Domain.GetUserDetails(request.Login.ToLower().Trim(), request.Password.Trim());
            var user = details.User;

            // user not found
            if (user == null)
            {
                return Unauthorized();
            }

            var tokenString = TokenAuthorization.CreateToken(
                user.Email,
                user.ImageUrl,
                $"{user.FirstName?.Trim()} {user.LastName?.Trim()}",
                user.Role,
                PolicyExtensions.GetRolePermissions(user.Role));

            var result = new TokenResponseDto(tokenString, TOKEN_TYPE.BEARER, DateTime.Now.AddDays(32));

            return Ok(result);
        }

        [HttpGet("identity-info")]
        public Task<IdentityInfo> GetIdentityInfoAsync()
            => Domain.GetUserIdentityInfo(Session.TokenClaims.Email);
    }
}
