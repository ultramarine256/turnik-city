using Data.EFRepository;
using Data.Entities.Abstract;
using Data.Infrastructure.UnitOfWork;
using Domain.Policy._Abstract;

namespace Domain.DomainServices._Abstractions
{
    public class EntityExtendedDomainService<TEntity, TPrimaryKey> : EntityDomainService<TEntity, TPrimaryKey>, IEntityExtendedDomainService<TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>, IUpdatableFrom<TEntity>, IPassivable, IOrderable
    {
        public new IEntityExtendedPolicy<TEntity, TPrimaryKey> Policy { get; }
        public new IEntityRepositoryX<TEntity, TPrimaryKey> Repository { get; }

        public EntityExtendedDomainService(
            IEntityExtendedPolicy<TEntity, TPrimaryKey> policy,
            IEntityRepositoryX<TEntity, TPrimaryKey> repository,
            IAppUnitOfWorkManager uowManager) : base(policy, repository, uowManager)
        {
            Policy = policy;
            Repository = repository;
        }

        public async Task ChangeActivityAsync(TPrimaryKey id, bool isActive)
        {
            var entity = await Repository.GetAsync(id);
            if (Policy.CanChangeActivity(entity))
            {
                using (var uow = UowManager.CurrentOrCreateNew())
                {
                    await Repository.PatchActivityAsync(id, isActive);
                    await uow.CompleteAsync();
                }
            }
        }

        public async Task ChangeOrdersAsync(TPrimaryKey id, int newOrder)
        {
            var entity = await Repository.GetAsync(id);
            if (Policy.CanChangeOrder(entity))
            {
                using (var uow = UowManager.CurrentOrCreateNew())
                {
                    await Repository.PatchOrderAsync(id, newOrder);
                    await uow.CompleteAsync();
                }
            }
        }
    }
}
