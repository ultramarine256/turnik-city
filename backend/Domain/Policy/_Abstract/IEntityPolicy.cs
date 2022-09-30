using Data.Entities.Abstract;

namespace Domain.Policy._Abstract
{
    public interface IEntityPolicy<TEntity, TPrimaryKey> where TEntity : class, IEntity<TPrimaryKey>
    {
        IQueryable<TEntity> InnerRetrieveAllFilter(IQueryable<TEntity> query);
        bool CanRetrieve(TEntity entity);
        bool CanCreate(TEntity entity);
        bool CanUpdate(TEntity entity);
        bool CanDelete(TEntity entity);
    }
}
