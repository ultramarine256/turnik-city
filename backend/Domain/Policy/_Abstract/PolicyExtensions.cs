namespace Domain.Policy._Abstract
{
    public static class PolicyExtensions
    {
        public static string GetRoleNameById(string roleId)
        {
            if (roleId == USER_ROLE.ADMIN)
            {
                return "Admin";
            }

            if (roleId == USER_ROLE.MEMBER)
            {
                return "Member";
            }

            throw new Exception("Wrong Role Slug");
        }

        public static IList<string> GetRolePermissions(string roleId) =>
            roleId switch
            {
                USER_ROLE.ADMIN => new List<string>()
                {
                    PermissionNames.CanAllAll
                },
                USER_ROLE.MEMBER => new List<string>()
                {
                    PermissionNames.CanRetrieveAll,
                    PermissionNames.CanAllOwn
                },
                USER_ROLE.ANONYMOUS => new List<string>()
                {
                    PermissionNames.CanRetrieveAll,
                },
                _ => throw new Exception("Wrong Role Slug")
            };
    }
}
