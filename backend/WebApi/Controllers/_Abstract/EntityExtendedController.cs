using Data.Entities.Abstract;
using Domain.DomainServices._Abstractions;
using WebApi.Controllers._Abstract.Dtos;

namespace WebApi.Controllers._Abstract
{
    public class EntityExtendedController<TEntity, TPrimaryKey, TEntityDto> :
        EntityController<TEntity, TPrimaryKey, TEntityDto>
        where TEntity : class, IEntity<TPrimaryKey>, IPassivable, IOrderable, IUpdatableFrom<TEntity>, new()
        where TEntityDto : class, IEntityDto<TEntity, TPrimaryKey, TEntityDto>, new()
    {
        public new IEntityExtendedDomainService<TEntity, TPrimaryKey> Domain;

        public EntityExtendedController(IEntityExtendedDomainService<TEntity, TPrimaryKey> domain) : base(domain)
        {
            Domain = domain;
        }

        protected Task BasePatchActivityAsync(TPrimaryKey id, bool isActive)
            => Domain.ChangeActivityAsync(id, isActive);

        protected Task BasePatchOrderAsync(TPrimaryKey id, int newOrder)
            => Domain.ChangeOrdersAsync(id, newOrder);
    }
}
