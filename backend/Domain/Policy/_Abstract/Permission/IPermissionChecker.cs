namespace Domain.Policy._Abstract.Permission
{
    public interface IPermissionChecker
    {
        bool IsGranted(string permission);
    }
}
