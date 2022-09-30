using Data.Entities.Abstract;

namespace WebApi.Controllers._Abstract.Dtos
{
    public interface IEntityDto<TEntity, TPrimaryKey, TEntityDto> 
        : IMapable<TEntity, TPrimaryKey, TEntityDto> where TEntity : class, IEntity<TPrimaryKey>
    {
        TPrimaryKey Id { get; set; }
    }

    public interface IMapable<TEntity, TPrimaryKey, TEntityDto>
    {
        TEntityDto MapFromEntity(TEntity entity);
        TEntity MapToEntity(TEntity entity);
    }
}
