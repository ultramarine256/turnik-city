using Domain.Infrastructure.Authorization;

namespace WebApi.Infrastructure.Authorization.Token.Models
{
    public class TokenClaims : ITokenClaims
    {
        public string Email { get; }
        public string ImageUrl { get; }
        public string FullName { get; }
        public string UserRole { get; }
        public IList<string> Permissions { get; }
        public IList<int> DealerIds { get; }
        public IList<string> DealerSlugs { get; }

        public TokenClaims(
            string email,
            string imageUrl,
            string fullName,
            string userRole,
            IList<string> permissions,
            IList<int> dealerIds,
            IList<string> dealerSlugs)
        {
            Email = email;
            ImageUrl = imageUrl;
            FullName = fullName;
            UserRole = userRole;
            Permissions = permissions;
            DealerIds = dealerIds;
            DealerSlugs = dealerSlugs;
        }
    }
}
