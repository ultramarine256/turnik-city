using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain.Infrastructure.Authorization;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using WebApi.Infrastructure.Authorization.Token.Models;

namespace WebApi.Infrastructure.Authorization.Token
{
    public class TokenAuthorization : ITokenAuthorization
    {
        private string SecurityKey { get; }
        private string RootPassword { get; }

        public TokenAuthorization(string securityKey, string rootPassword)
        {
            SecurityKey = securityKey;
            RootPassword = rootPassword;
        }

        public string GetRootPassword()
            => RootPassword;

        public string CreateToken(
            string email,
            string imageUrl,
            string fullName,
            string role,
            IList<string> permissions,
            IList<int> dealerIds,
            IList<string> dealerSlugs)
        {
            // TODO: use claims standard naming
            // https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/technical-reference/the-role-of-claims

            var claims = new[]
            {
                // new Claim(TOKEN_KEYS.USER_ID, userId.ToString()),
                new Claim(TOKEN_KEYS.EMAIL, email),
                new Claim(TOKEN_KEYS.IMAGE_URL, imageUrl),
                new Claim(TOKEN_KEYS.FULL_NAME,  fullName),
                new Claim(TOKEN_KEYS.ROLE, role),
                new Claim(TOKEN_KEYS.PERMISSIONS, JsonConvert.SerializeObject(permissions)),
                new Claim(TOKEN_KEYS.DEALER_IDS, JsonConvert.SerializeObject(dealerIds)),
                new Claim(TOKEN_KEYS.DEALER_SLUGS, JsonConvert.SerializeObject(dealerSlugs))
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecurityKey));
            var creeds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                APP_NAME.TOKEN_ISSUER,
                APP_NAME.TOKEN_AUDIENCE,
                claims,
                expires: DateTime.Now.AddDays(14),
                signingCredentials: creeds);

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return tokenString;
        }

        public ITokenClaims GetUserClaimsFromHttpContext(HttpContext httpContext)
        {
            var dictionary = httpContext.User.Claims.ToDictionary((item) => item.Type, (item) => item.Value);

            if (dictionary.Count == 0)
            {
                return null;
            }

            var email = dictionary[TOKEN_KEYS.EMAIL];
            var imageUrl = dictionary[TOKEN_KEYS.IMAGE_URL];
            var fullName = dictionary[TOKEN_KEYS.FULL_NAME];
            var role = dictionary[TOKEN_KEYS.ROLE];
            var permissions = JsonConvert.DeserializeObject<IList<string>>(dictionary[TOKEN_KEYS.PERMISSIONS]);

            var dealerSlugsJson = dictionary[TOKEN_KEYS.DEALER_SLUGS];
            var dealerSlugs = !string.IsNullOrEmpty(dealerSlugsJson) ? JsonConvert.DeserializeObject<IList<string>>(dealerSlugsJson) : new List<string>();
            var dealerIdsJson = dictionary[TOKEN_KEYS.DEALER_IDS];
            var dealerIds = !string.IsNullOrEmpty(dealerIdsJson) ? JsonConvert.DeserializeObject<IList<int>>(dealerIdsJson) : new List<int>();

            return new TokenClaims(email, imageUrl, fullName, role, permissions, dealerIds, dealerSlugs);
        }
    }

    public static class AUTH_SCOPE
    {
        public const string
            ADMIN = "admin",
            APP = "app";
    }

    public static class TOKEN_TYPE
    {
        public const string
            BEARER = "bearer";
    }

    public static class TOKEN_KEYS
    {
        public const string
            EMAIL = "email_",
            IMAGE_URL = "imageUrl",
            FULL_NAME = "fullName",
            ROLE = "role_",
            PERMISSIONS = "permissions",
            DEALER_IDS = "dealerIds",
            DEALER_SLUGS = "dealerSlugs";
    }
}
