using System.Linq.Expressions;
using Data.Entities.Abstract;

namespace Data.EFRepository
{
    public interface IEntityRepository<TEntity, TPrimaryKey> where TEntity : IEntity<TPrimaryKey>
    {
        IQueryable<TEntity> Query { get; }

        Task<TEntity> GetAsync(TPrimaryKey id, params Expression<Func<TEntity, object>>[] includes);
        Task<TEntity> GetBySlugAsync(string slug, params Expression<Func<TEntity, object>>[] includes);
        Task CreateAsync(TEntity entity);
        Task CreateRange(IEnumerable<TEntity> entities);
        Task UpdateAsync(TEntity entity);
        Task DeleteAsync(TEntity entity);
        Task DeleteRange(Func<IQueryable<TEntity>, IQueryable<TEntity>> queryBuilder);

        Task<TEntity> GetAsNoTrackingAsync(TPrimaryKey id, params Expression<Func<TEntity, object>>[] includes);
        Task<int> GetTotalCountAsync(Func<IQueryable<TEntity>, IQueryable<TEntity>> queryBuilder);
        Task<IList<TEntity>> GetAllAsync(Func<IQueryable<TEntity>, IQueryable<TEntity>> queryBuilder, params Expression<Func<TEntity, object>>[] includes);
        Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> filter, params Expression<Func<TEntity, object>>[] includes);
        Task<TEntity> FirstOrDefaultTracking(TPrimaryKey id);
    }
}

