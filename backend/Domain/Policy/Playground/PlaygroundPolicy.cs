using Data.Entities;
using Domain.Policy._Abstract;
using Domain.Policy._Abstract.Permission;
using Domain.Session;

namespace Domain.Policy.Playground
{
    public class PlaygroundPolicy : EntityPolicy<PlaygroundEntity, int>, IPlaygroundPolicy
    {
        public PlaygroundPolicy(IPermissionChecker permissionChecker, IAppSession session) : base(permissionChecker, session) { }

        public override IQueryable<PlaygroundEntity> InnerRetrieveAllFilter(IQueryable<PlaygroundEntity> query)
        {
            var granted =
                PermissionChecker.IsGranted(PermissionNames.CanAllAll) ||
                PermissionChecker.IsGranted(PermissionNames.CanAllPlayground) ||
                PermissionChecker.IsGranted(PermissionNames.CanRetrievePlayground);

            if (granted)
            {
                return query;
            }

            if (PermissionChecker.IsGranted(PermissionNames.CanAllOwn) ||
                PermissionChecker.IsGranted(PermissionNames.CanAllOwnPlayground) ||
                PermissionChecker.IsGranted(PermissionNames.CanRetrieveOwnPlayground))
            {
                return query.Where(r => Session.TokenClaims.Email.Equals(r.CreatedBy));
            }

            return query.Where(r => false);
        }

        public override bool CanRetrieve(PlaygroundEntity entity)
        {
            var result = InnerRetrieveAllFilter(new List<PlaygroundEntity>() { entity }.AsQueryable()).Any();
            return result;
        }

        public override bool CanCreate(PlaygroundEntity entity)
        {
            var result = PermissionChecker.IsGranted(PermissionNames.CanAllAll) ||
                         PermissionChecker.IsGranted(PermissionNames.CanAllPlayground) ||
                         PermissionChecker.IsGranted(PermissionNames.CanCreatePlayground);

            return result;
        }

        public override bool CanUpdate(PlaygroundEntity entity)
        {
            var result = PermissionChecker.IsGranted(PermissionNames.CanAllAll) ||
                         PermissionChecker.IsGranted(PermissionNames.CanAllPlayground) ||
                         PermissionChecker.IsGranted(PermissionNames.CanUpdatePlayground);
            if (!result)
            {
                var canOwn = PermissionChecker.IsGranted(PermissionNames.CanUpdateOwnPlayground);
                var isOwn = Session.TokenClaims.Email.Equals(entity.CreatedBy);
                result = canOwn && isOwn;
            }

            return result;
        }

        public override bool CanDelete(PlaygroundEntity entity)
        {
            var result = PermissionChecker.IsGranted(PermissionNames.CanAllAll) ||
                         PermissionChecker.IsGranted(PermissionNames.CanAllPlayground) ||
                         PermissionChecker.IsGranted(PermissionNames.CanDeletePlayground);

            if (!result)
            {
                var canOwn = PermissionChecker.IsGranted(PermissionNames.CanAllOwnPlayground) || PermissionChecker.IsGranted(PermissionNames.CanDeleteOwnPlayground);
                var isOwn = Session.TokenClaims.Email.Equals(entity.CreatedBy);
                result = canOwn && isOwn;
            }

            return result;
        }
    }
}
