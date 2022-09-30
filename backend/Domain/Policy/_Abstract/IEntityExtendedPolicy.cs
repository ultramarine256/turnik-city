using Data.Entities.Abstract;

namespace Domain.Policy._Abstract
{
    public interface IEntityExtendedPolicy<TEntity, TPrimaryKey> : IEntityPolicy<TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>, IPassivable, IOrderable
    {
        bool CanChangeActivity(TEntity entity);
        bool CanChangeOrder(TEntity entity);
    }
}
