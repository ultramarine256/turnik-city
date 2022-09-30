using Data.Entities.Abstract;
using Domain.Policy._Abstract;
using Domain.Policy._Abstract.Permission;
using Domain.Session;

namespace Domain.Policy
{
    public class NullEntityExtendedPolicy<TEntity, TPrimaryKey> : NullEntityPolicy<TEntity, TPrimaryKey>, IEntityExtendedPolicy<TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>, IPassivable, IOrderable
    {
        public NullEntityExtendedPolicy(
            IPermissionChecker permissionChecker,
            IAppSession session) : base(permissionChecker, session) { }

        public bool CanChangeActivity(TEntity entity)
            => true;

        public bool CanChangeOrder(TEntity entity)
            => true;
    }
}
