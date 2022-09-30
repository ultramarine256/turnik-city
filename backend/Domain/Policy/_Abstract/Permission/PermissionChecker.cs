using Domain.Session;

namespace Domain.Policy._Abstract.Permission
{
    public class PermissionChecker : IPermissionChecker
    {
        public IAppSession Session { get; }

        public PermissionChecker(IAppSession session)
        {
            Session = session;
        }

        public bool IsGranted(string permission)
        {
            return Session.TokenClaims.Permissions.Contains(permission);
        }
    }
}
