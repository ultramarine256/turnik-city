namespace Domain.Policy._Abstract.Permission
{
    public class PermissionCheckerMock : IPermissionChecker
    {
        public bool IsGranted(string permission) => true;
    }
}
