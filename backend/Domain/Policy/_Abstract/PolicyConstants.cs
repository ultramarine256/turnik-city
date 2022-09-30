namespace Domain.Policy._Abstract
{
    public static class USER_ROLE
    {
        public const string
            ADMIN = "admin",
            MEMBER = "member",
            ANONYMOUS = "anonymous";
    }

    public static class PermissionNames
    {
        public const string
            // General
            CanAllAll = "CanAllAll",
            CanRetrieveAll = "CanRetrieveAll",
            CanCreateAll = "CanCreateAll",
            CanUpdateAll = "CanUpdateAll",
            CanDeleteAll = "CanDeleteAll",

            CanAllOwn = "CanAllOwn",
            CanRetrieveOwn = "CanRetrieveAll",
            CanUpdateOwn = "CanUpdateAll",
            CanDeleteOwn = "CanDeleteAll",

            // Playground
            CanAllPlayground = "CanAllPlayground",
            CanCreatePlayground = "CanCreatePlayground",
            CanRetrievePlayground = "CanRetrievePlayground",
            CanUpdatePlayground = "CanUpdatePlayground",
            CanDeletePlayground = "CanDeletePlayground",

            CanAllOwnPlayground = "CanAllOwnPlayground",
            CanRetrieveOwnPlayground = "CanRetrieveOwnPlayground",
            CanUpdateOwnPlayground = "CanUpdateOwnPlayground",
            CanDeleteOwnPlayground = "CanDeleteOwnPlayground",

            // User
            CanAllUser = "CanAllUser",
            CanRetrieveUser = "CanRetrieveUser",
            CanCreateUser = "CanCreateUser",
            CanUpdateUser = "CanUpdateUser",
            CanDeleteUser = "CanDeleteUser",

            CanAllOwnUser = "CanAllOwnUser",
            CanRetrieveOwnUser = "CanRetrieveOwnUser",
            CanUpdateOwnUser = "CanUpdateOwnUser",
            CanDeleteOwnUser = "CanDeleteOwnUser",

            CanUpdateProfile = "CanUpdateProfile",
            CanChangePassword = "CanChangePassword",

            // Comment
            CanAllReview = "CanAllReview",
            CanCreateReview = "CanCreateReview",
            CanRetrieveReview = "CanRetrieveReview",
            CanUpdateReview = "CanUpdateReview",
            CanDeleteReview = "CanDeleteReview";
    }
}
