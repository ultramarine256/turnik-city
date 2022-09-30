using Domain.Infrastructure.Authorization;
using Domain.Session;
using WebApi.Infrastructure.Authorization.Token;

namespace WebApi.Infrastructure.HttpContextAccessor
{
    public class AppHttpContextAccessor : IAppSession
    {
        public ITokenClaims TokenClaims { get; }
        public ITokenAuthorization AppAuthorizationService { get; }

        public AppHttpContextAccessor(
            IHttpContextAccessor httpContextAccessor,
            ITokenAuthorization appAuthorizationService)
        {
            AppAuthorizationService = appAuthorizationService;
            TokenClaims = AppAuthorizationService.GetUserClaimsFromHttpContext(httpContextAccessor.HttpContext);
        }
    }
}
