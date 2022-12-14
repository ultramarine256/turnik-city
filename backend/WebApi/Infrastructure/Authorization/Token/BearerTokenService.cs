using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Data;
using Domain.Infrastructure.Authorization;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using WebApi.Infrastructure.Authorization.Token.Models;

namespace WebApi.Infrastructure.Authorization.Token
{
    public class BearerTokenService : IBearerTokenService
    {
        private string SymmetricSecurityKey { get; }

        public BearerTokenService(string symmetricSecurityKey)
        {
            SymmetricSecurityKey = symmetricSecurityKey;
        }

        public string CreateToken(
            string email,
            string imageUrl,
            string fullName,
            string role,
            IList<string> permissions)
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
                new Claim(TOKEN_KEYS.PERMISSIONS, JsonConvert.SerializeObject(permissions))

            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SymmetricSecurityKey));
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

            return new TokenClaims(email, imageUrl, fullName, role, permissions);
        }
    }

    public static class AUTH_SCOPE
    {
        public const string ADMIN = "admin";
        public const string APP = "app";
    }

    public static class TOKEN_TYPE
    {
        public const string BEARER = "bearer";
    }

    public static class TOKEN_KEYS
    {
        public const string EMAIL = "email_";
        public const string IMAGE_URL = "imageUrl";
        public const string FULL_NAME = "fullName";
        public const string ROLE = "role_";
        public const string PERMISSIONS = "permissions";
    }
}
