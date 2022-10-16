using Data.Entities.Abstract;
using Data.Infrastructure.ContextManager;
using Data.Infrastructure.Extensions;
using Data.ThirdParty.Storage;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Data.EFRepository
{
    public class EntityRepositoryX<TEntity, TPrimaryKey> : EntityRepository<TEntity, TPrimaryKey>, IEntityRepositoryX<TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>, IPassivable, IOrderable, new()
    {
        public EntityRepositoryX(IContextManager dbContextManager, IStorageService storageService, IMemoryCache cache) : base(dbContextManager, storageService, cache) { }

        public override async Task CreateAsync(TEntity entity)
        {
            entity.Order = Context.Set<TEntity>()
                               .AsEnumerable()
                               .Count(r => r.GetPropValue(entity.GroupedProperty()).ToString() == entity.GetPropValue(entity.GroupedProperty()).ToString()) + 1;
            await base.CreateAsync(entity);
        }

        public override async Task DeleteAsync(TEntity entity)
        {
            Context.Set<TEntity>().Remove(entity);

            var entities = Context.Set<TEntity>()
                .AsEnumerable()
                .Where(r => r.GetPropValue(entity.GroupedProperty()).ToString() == entity.GetPropValue(entity.GroupedProperty()).ToString() && !r.Id.Equals(entity.Id))
                .OrderBy(r => r.Order).ToList();

            var i = 0;
            entities.ForEach(r => r.Order = ++i);
        }

        public virtual async Task PatchActivityAsync(TPrimaryKey id, bool isActive)
        {
            var entity = await Context.Set<TEntity>().FirstOrDefaultAsync(r => r.Id!.Equals(id));
            entity!.IsActive = isActive;
        }

        public virtual async Task PatchOrderAsync(TPrimaryKey id, int newOrder)
        {
            var query = Context.Set<TEntity>().AsQueryable();
            query = ApplyIncludes(query, new TEntity().GetEntityIncludes());

            var entity = query.FirstOrDefault(r => r.Id.Equals(id));
            var groupedPropertyValue = entity.GetType().GetProperty(entity.GroupedProperty()).GetValue(entity).ToString();

            var entitiesCount = Context
                .Set<TEntity>()
                .AsEnumerable()
                .Count(r => r.GetType().GetProperty(entity.GroupedProperty()).GetValue(r).ToString() == groupedPropertyValue);

            if (newOrder <= 0 || newOrder > entitiesCount)
            { return; }

            var entities = Context
                .Set<TEntity>()
                .AsEnumerable().Where(r =>
                    r.GetType().GetProperty(entity.GroupedProperty()).GetValue(r).ToString() == groupedPropertyValue);

            // we must store a old order, because it would change in ForEach
            var oldOrder = entity.Order;
            entities.ToList().ForEach(item =>
            {
                // before all execution we need to detect min and max range, that have changes
                var min = Math.Min(oldOrder, newOrder);
                var max = Math.Max(oldOrder, newOrder);

                // create flag that show us that item order is entered the our range
                var isInRange = item.Order >= min && item.Order <= max;

                // this flag indicate that order is higher than old order
                var isBigger = newOrder > oldOrder;

                // if order in list equal id that we pass, then we should setup new order for it
                if (item.Id!.ToString() == id!.ToString())
                {
                    item.Order = newOrder;
                    return;
                }

                // if order do not enter range that change, we must ignore it
                // for example if we have 10 items in total, and we drag second item to 5,
                // it is mean that range is from 2 to 5
                if (!isInRange)
                {
                    return;
                }

                // after all we should increase or decrease order, it depends from new order number
                // if item order is smaller than new order and new order is bigger than old order
                // we should decrease order, and for opposite (when new order is smaller then item order)
                // we must increase order
                var smaller = item.Order - 1;
                var bigger = item.Order + 1;
                item.Order = item.Order <= newOrder && isBigger ? smaller : bigger;
            });
        }
    }
}
