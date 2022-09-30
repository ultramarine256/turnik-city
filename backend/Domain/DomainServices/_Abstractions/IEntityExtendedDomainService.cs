using Data.Entities.Abstract;

namespace Domain.DomainServices._Abstractions
{
    public interface IEntityExtendedDomainService<TEntity, TPrimaryKey>
        : IEntityDomainService<TEntity, TPrimaryKey> where TEntity : class, IEntity<TPrimaryKey>, IPassivable, IOrderable
    {
        Task ChangeActivityAsync(TPrimaryKey id, bool isActive);
        Task ChangeOrdersAsync(TPrimaryKey id, int newOrder);
    }
}
