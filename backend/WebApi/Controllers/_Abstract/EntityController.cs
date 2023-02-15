using Data.Entities.Abstract;
using Domain.DomainServices._Abstractions;
using Microsoft.AspNetCore.Mvc;
using WebApi.Controllers._Abstract.Dtos;

namespace WebApi.Controllers._Abstract
{
    public class EntityController<TEntity, TPrimaryKey, TEntityDto> : Controller
        where TEntity : class, IEntity<TPrimaryKey>, IUpdatableFrom<TEntity>, new()
        where TEntityDto : class, IEntityDto<TEntity, TPrimaryKey, TEntityDto>, new()
    {
        public IEntityDomainService<TEntity, TPrimaryKey> Domain { get; }

        public EntityController(IEntityDomainService<TEntity, TPrimaryKey> domain)
        {
            Domain = domain;
        }

        protected IEnumerable<TEntityDto> BaseQuery()
            => Domain.Query().AsEnumerable().Select(r => new TEntityDto().MapFromEntity(r));

        protected IQueryable<TEntityDto> BaseQueryOptimized()
            => Domain.Query().Select(r => new TEntityDto().MapFromEntity(r));

        protected virtual async Task<TEntityDto> BaseGetAsync(TPrimaryKey id)
        {
            var entity = await Domain.GetAsync(id);
            var response = new TEntityDto();
            response.MapFromEntity(entity);
            return response;
        }

        protected virtual async Task<TEntityDto> BaseCreateAsync(TEntityDto json)
        {
            if (json == null)
            {
                throw new ArgumentNullException(nameof(json));
            }

            var entity = json.MapToEntity(new TEntity());
            await Domain.CreateAsync(entity);
            return await BaseGetAsync(entity.Id);
        }

        protected virtual async Task<TEntityDto> BaseUpdateAsync(TEntityDto request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            var entity = request.MapToEntity(new TEntity());
            await Domain.UpdateAsync(entity);
            return await BaseGetAsync(entity.Id);
        }

        protected virtual Task BaseDelete(TPrimaryKey id)
            => Domain.DeleteAsync(id);
    }
}
