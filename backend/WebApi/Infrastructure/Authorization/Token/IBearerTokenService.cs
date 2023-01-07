using Domain.Infrastructure.Authorization;

namespace WebApi.Infrastructure.Authorization.Token
{
    public interface IBearerTokenService
    {
        string CreateToken(
            string slug,
            string email,
            string imageUrl,
            string fullName,
            string role,
            IList<string> permissions);
        ITokenClaims GetUserClaimsFromHttpContext(HttpContext httpContext);
    }
}
