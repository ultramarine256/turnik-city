using System.Linq.Expressions;
using Data.Entities.Abstract;
using Data.Infrastructure.ContextManager;
using Data.Infrastructure.Extensions;
using Data.ThirdParty.Storage;
using Microsoft.EntityFrameworkCore;

namespace Data.EFRepository
{
    public class EntityRepository<TEntity, TPrimaryKey> : BaseRepository, IEntityRepository<TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>, new()
    {
        public IStorageService StorageService { get; }
        public bool OnSystemFilters { get; }
        public IQueryable<TEntity> Query => DbContextManager.CurrentContext.Set<TEntity>().AsNoTracking().AsQueryable();

        public EntityRepository(IContextManager dbContextManager, IStorageService storageService) : base(dbContextManager)
        {
            StorageService = storageService;
            OnSystemFilters = true;
        }

        #region CRUD

        public virtual async Task<TEntity> GetAsync(TPrimaryKey id, params Expression<Func<TEntity, object>>[] includes)
        {
            var query = Context.Set<TEntity>().AsQueryable();
            query = ApplyIncludes(query, new TEntity().GetEntityIncludes());
            return await query.FirstOrDefaultAsync(r => r.Id.Equals(id));
        }

        public virtual async Task CreateAsync(TEntity entity)
        {
            entity = await ExtendedWithStorage(entity);
            DbContextManager.BuildOrCurrentContext(out _).Add(entity);
        }

        public virtual async Task CreateRange(IEnumerable<TEntity> entities)
            => Context.Set<TEntity>().AddRangeAsync(entities);

        public virtual async Task UpdateAsync(TEntity entity)
        {
            var createdNew = false;
            try
            {
                entity = await ExtendedWithStorage(entity);
                DbContextManager.BuildOrCurrentContext(out createdNew).Update(entity);
            }
            finally
            {
                if (createdNew)
                {
                    await DbContextManager.CurrentContext.SaveChangesAsync();
                    DbContextManager.DisposeContext();
                }
            }
        }

        public virtual async Task DeleteAsync(TEntity entity)
        {
            var createdNew = false;
            try
            {
                await RemoveImage(entity);
                DbContextManager.BuildOrCurrentContext(out createdNew).Remove(entity);
            }
            finally
            {
                if (createdNew)
                {
                    await DbContextManager.CurrentContext.SaveChangesAsync();
                    DbContextManager.DisposeContext();
                }
            }
        }

        public virtual async Task DeleteRange(Func<IQueryable<TEntity>, IQueryable<TEntity>> queryBuilder)
        {
            var createdNew = false;
            try
            {
                var entities = await GetAllAsync(queryBuilder);
                DbContextManager.BuildOrCurrentContext(out createdNew).RemoveRange(entities);
            }
            finally
            {
                if (createdNew)
                {
                    await DbContextManager.CurrentContext.SaveChangesAsync();
                    DbContextManager.DisposeContext();
                }
            }
        }

        #endregion

        #region More

        public virtual async Task<TEntity> GetAsNoTrackingAsync(TPrimaryKey id, params Expression<Func<TEntity, object>>[] includes)
        {
            var query = Context.Set<TEntity>().AsQueryable();
            query = ApplyIncludes(query, new TEntity().GetEntityIncludes());
            return await query.AsNoTracking().FirstOrDefaultAsync(r => r.Id.Equals(id));
        }

        public virtual async Task<int> GetTotalCountAsync(Func<IQueryable<TEntity>, IQueryable<TEntity>> queryBuilder)
        {
            var set = DbContextManager.BuildOrCurrentContext(out var createdNew).Set<TEntity>();
            var query = OnSystemFilters ? await ApplySystemFilters(queryBuilder(set)) : queryBuilder(set);
            if (createdNew)
            {
                DbContextManager.DisposeContext();
            }
            return query.Count();
        }

        public virtual async Task<IList<TEntity>> GetAllAsync(Func<IQueryable<TEntity>, IQueryable<TEntity>> queryBuilder, params Expression<Func<TEntity, object>>[] includes)
        {
            var set = DbContextManager.BuildOrCurrentContext(out var createdNew).Set<TEntity>();
            var query = OnSystemFilters ? await ApplySystemFilters(queryBuilder(ApplyIncludes(set, includes))) : queryBuilder(ApplyIncludes(set, includes));
            if (createdNew)
            {
                DbContextManager.DisposeContext();
            }
            return await query.ToListAsync();
        }

        public virtual async Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> filter, params Expression<Func<TEntity, object>>[] includes)
        {
            var set = DbContextManager.BuildOrCurrentContext().Set<TEntity>().AsNoTracking();
            var query = OnSystemFilters ? await ApplySystemFilters(Queryable.Where(ApplyIncludes(set, includes), filter)) : Queryable.Where(ApplyIncludes(set, includes), filter);
            return await query.FirstOrDefaultAsync();
        }

        public virtual Task<TEntity> FirstOrDefaultTracking(TPrimaryKey id) =>
            Context.Set<TEntity>().FirstOrDefaultAsync(r => r.Id.Equals(id));

        #endregion

        #region Helpers

        private async Task<TEntity> ExtendedWithStorage(TEntity entity)
        {
            if (entity is IHasImageEntity imageEntity)
            {
                var isValidBase64 = !String.IsNullOrEmpty(imageEntity.ImageUrl) && imageEntity.ImageUrl.IsBase64();
                if (isValidBase64)
                {
                    // imageEntity.ImageUrl = (await StorageService.UploadImage(imageEntity.ImageUrl)).AbsoluteUri;
                }
            }

            return entity;
        }

        private async Task RemoveImage(TEntity entity)
        {
            if (entity is IHasImageEntity imageEntity)
            {
                var isValidBase64 = !String.IsNullOrEmpty(imageEntity.ImageUrl) && imageEntity.ImageUrl.IsBase64();
                if (isValidBase64)
                {
                    // await StorageService.RemoveFile(imageEntity.ImageUrl);
                }
            }
        }

        protected static Expression<Func<TEntity, bool>> CreateEqualityExpressionForId(TPrimaryKey id)
        {
            var lambdaParam = Expression.Parameter(typeof(TEntity));
            var lambdaBody = Expression.Equal(Expression.PropertyOrField(lambdaParam, "Id"), Expression.Constant(id, typeof(TPrimaryKey)));
            return Expression.Lambda<Func<TEntity, bool>>(lambdaBody, lambdaParam);
        }

        protected virtual Task<IQueryable<TEntity>> ApplySystemFilters(IQueryable<TEntity> query) => Task.FromResult(query);

        protected IQueryable<TEntity> ApplyIncludes(IQueryable<TEntity> query, Expression<Func<TEntity, object>>[] includes)
        {
            if (includes != null)
            {
                foreach (var include in includes)
                {
                    query = query.Include(include);
                }
            }
            return query;
        }

        protected IQueryable<TEntity> ApplyIncludes(IQueryable<TEntity> query, IList<string> includes) =>
            includes.Aggregate(query, (current, include) => current.Include(include));

        #endregion
    }
}
