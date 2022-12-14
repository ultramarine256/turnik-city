using Domain.Infrastructure.Authorization;
using Domain.Session;
using WebApi.Infrastructure.Authorization.Token;

namespace WebApi.Infrastructure.HttpContextAccessor
{
    public class AppHttpContextAccessor : IAppSession
    {
        public ITokenClaims TokenClaims { get; }
        public IBearerTokenService BearerTokenService { get; }

        public AppHttpContextAccessor(
            IHttpContextAccessor httpContextAccessor,
            IBearerTokenService bearerTokenService)
        {
            BearerTokenService = bearerTokenService;
            TokenClaims = BearerTokenService.GetUserClaimsFromHttpContext(httpContextAccessor.HttpContext);
        }
    }
}
