using Data.Entities.Abstract;
using Domain.Policy._Abstract.Permission;
using Domain.Session;

namespace Domain.Policy._Abstract
{
    public abstract class EntityPolicy<TEntity, TPrimaryKey> : IEntityPolicy<TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>
    {
        public IPermissionChecker PermissionChecker;
        public IAppSession Session { get; }

        protected EntityPolicy(IPermissionChecker permissionChecker, IAppSession session)
        {
            Session = session;
            PermissionChecker = permissionChecker;
        }

        public abstract IQueryable<TEntity> InnerRetrieveAllFilter(IQueryable<TEntity> query);
        public abstract bool CanRetrieve(TEntity entity);
        public abstract bool CanCreate(TEntity entity);
        public abstract bool CanUpdate(TEntity entity);
        public abstract bool CanDelete(TEntity entity);
    }
}
