using Domain.Infrastructure.Authorization;

namespace WebApi.Infrastructure.Authorization.Token.Models
{
    public class TokenClaims : ITokenClaims
    {
        public string Slug { get; }
        public string Email { get; }
        public string ImageUrl { get; }
        public string FullName { get; }
        public string UserRole { get; }
        public IList<string> Permissions { get; }

        public TokenClaims(
            string slug,
            string email,
            string imageUrl,
            string fullName,
            string userRole,
            IList<string> permissions)
        {
            Slug = slug;
            Email = email;
            ImageUrl = imageUrl;
            FullName = fullName;
            UserRole = userRole;
            Permissions = permissions;
        }
    }
}
