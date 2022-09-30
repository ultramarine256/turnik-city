using Data.Entities.Abstract;

namespace WebApi.Controllers._Abstract.Dtos
{
    public class EntityDto<TEntity, TPrimaryKey, TEntityDto> : IEntityDto<TEntity, TPrimaryKey, TEntityDto>
        where TEntity : class, IEntity<TPrimaryKey>, new()
        where TEntityDto : class, IEntityDto<TEntity, TPrimaryKey, TEntityDto>, new()
    {
        public TPrimaryKey Id { get; set; }

        public virtual TEntityDto MapFromEntity(TEntity entity)
        {
            // TODO: return this!
            Id = entity.Id;
            return new TEntityDto() { Id = entity.Id };
        }

        public virtual TEntity MapToEntity(TEntity entity)
        {
            entity.Id = Id;
            return entity;
        }
    }
}
