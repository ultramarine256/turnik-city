using Domain.Infrastructure.Authorization;

namespace WebApi.Infrastructure.Authorization.Token
{
    public interface ITokenAuthorization
    {
        string CreateToken(
            string email,
            string imageUrl,
            string fullName,
            string role,
            IList<string> permissions,
            IList<int> dealerIds,
            IList<string> dealerSlugs);
        ITokenClaims GetUserClaimsFromHttpContext(HttpContext httpContext);
        string GetRootPassword();
    }
}
