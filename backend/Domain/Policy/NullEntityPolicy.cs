using Data.Entities.Abstract;
using Domain.Policy._Abstract;
using Domain.Policy._Abstract.Permission;
using Domain.Session;

namespace Domain.Policy
{
    public class NullEntityPolicy<TEntity, TPrimaryKey> : EntityPolicy<TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>
    {
        public NullEntityPolicy(
            IPermissionChecker permissionChecker,
            IAppSession session) : base(permissionChecker, session) { }

        public override IQueryable<TEntity> InnerRetrieveAllFilter(IQueryable<TEntity> query)
            => query;

        public override bool CanRetrieve(TEntity entity)
            => true;

        public override bool CanCreate(TEntity entity)
            => true;

        public override bool CanUpdate(TEntity entity)
            => true;

        public override bool CanDelete(TEntity entity)
            => true;
    }
}
