using Domain.Infrastructure.Authorization;

namespace Domain.Session
{
    public class AppSessionMock : IAppSession
    {
        public ITokenClaims TokenClaims { get; }
    }
}
