using Data.Entities.Abstract;

namespace Domain.DomainServices._Abstractions
{
    public interface IEntityDomainService<TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>
    {
        IQueryable<TEntity> Query(int skip = 0, int take = 100);
        Task<TEntity> GetAsync(TPrimaryKey id);
        Task<TEntity> CreateAsync(TEntity entity);
        Task<TEntity> UpdateAsync(TEntity entity);
        Task DeleteAsync(TPrimaryKey id);
    }
}
