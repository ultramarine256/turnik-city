using Data.EFRepository;
using Data.Entities.Abstract;
using Data.Infrastructure.UnitOfWork;
using Domain.Policy._Abstract;

namespace Domain.DomainServices._Abstractions
{
    public class EntityDomainService<TEntity, TPrimaryKey> : IEntityDomainService<TEntity, TPrimaryKey>
        where TEntity : class, IUpdatableFrom<TEntity>, IEntity<TPrimaryKey>
    {
        protected IEntityPolicy<TEntity, TPrimaryKey> Policy { get; }
        protected IEntityRepository<TEntity, TPrimaryKey> Repository { get; }
        protected IAppUnitOfWorkManager UowManager { get; }

        public EntityDomainService(
            IEntityPolicy<TEntity, TPrimaryKey> policy,
            IEntityRepository<TEntity, TPrimaryKey> repository,
            IAppUnitOfWorkManager uowManager)
        {
            Policy = policy;
            Repository = repository;
            UowManager = uowManager;
        }

        public virtual IQueryable<TEntity> Query(int skip = 0, int take = 100) => 
            Policy.InnerRetrieveAllFilter(Repository.Query.Take(take));

        public virtual async Task<TEntity> GetAsync(TPrimaryKey id)
        {
            var entity = await Repository.GetAsNoTrackingAsync(id);
            return Policy.CanRetrieve(entity) ? entity : null;
        }

        public virtual async Task<TEntity> CreateAsync(TEntity entity)
        {
            if (!Policy.CanCreate(entity))
            { return null; }

            using var uow = UowManager.CurrentOrCreateNew();
            await Repository.CreateAsync(entity);
            await uow.CompleteAsync();

            return entity;
        }

        public virtual async Task<TEntity> UpdateAsync(TEntity entity)
        {
            var oldEntity = await Repository.GetAsNoTrackingAsync(entity.Id);
            if (!Policy.CanUpdate(oldEntity))
            {
                return entity;
            }

            using var uow = UowManager.CurrentOrCreateNew();
            oldEntity.UpdateFrom(entity);
            await Repository.UpdateAsync(oldEntity);
            await uow.CompleteAsync();

            return entity;
        }

        public virtual async Task DeleteAsync(TPrimaryKey id)
        {
            var entity = await Repository.GetAsNoTrackingAsync(id);
            if (Policy.CanDelete(entity))
            {
                using (var uow = UowManager.CurrentOrCreateNew())
                {
                    await Repository.DeleteAsync(entity);
                    await uow.CompleteAsync();
                }
            }
        }
    }
}
