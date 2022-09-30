using Data.Entities.Abstract;

namespace Data.EFRepository
{
    public interface IEntityRepositoryX<TEntity, TPrimaryKey> : IEntityRepository<TEntity, TPrimaryKey>
        where TEntity : IEntity<TPrimaryKey>, IPassivable, IOrderable
    {
        Task PatchActivityAsync(TPrimaryKey id, bool isActive);
        Task PatchOrderAsync(TPrimaryKey id, int order);
    }
}
