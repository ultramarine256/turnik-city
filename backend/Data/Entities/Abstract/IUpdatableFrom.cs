namespace Data.Entities.Abstract
{
    public interface IUpdatableFrom<TEntity>
    {
        void UpdateFrom(TEntity actualEntity);
    }
}
