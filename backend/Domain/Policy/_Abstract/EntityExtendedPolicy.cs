using Data.Entities.Abstract;
using Domain.Policy._Abstract.Permission;
using Domain.Session;

namespace Domain.Policy._Abstract
{
    public abstract class EntityExtendedPolicy<TEntity, TPrimaryKey> : EntityPolicy<TEntity, TPrimaryKey>, IEntityExtendedPolicy<TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>, IPassivable, IOrderable
    {
        public EntityExtendedPolicy(IPermissionChecker permissionChecker, IAppSession session)
            : base(permissionChecker, session)
        { }

        public abstract bool CanChangeActivity(TEntity entity);
        public abstract bool CanChangeOrder(TEntity entity);
    }
}
