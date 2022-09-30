using Domain.Infrastructure.Authorization;

namespace Domain.Session
{
    public interface IAppSession
    {
        ITokenClaims TokenClaims { get; }
    }
}
