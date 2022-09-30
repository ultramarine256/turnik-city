namespace Data.Entities.Abstract
{
    /// <summary>
    /// Is used as Base entity
    /// </summary>
    /// <typeparam name="TPrimaryKey">type of primary key</typeparam>
    public interface IEntity<TPrimaryKey>
    {
        TPrimaryKey Id { get; set; }
        IList<string> GetEntityIncludes();
    }
}
