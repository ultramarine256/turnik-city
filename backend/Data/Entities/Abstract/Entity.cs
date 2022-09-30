namespace Data.Entities.Abstract
{
    /// <summary>
    /// Is used as base class for all App entities
    /// </summary>
    /// <typeparam name="TPrimaryKey">type of primary key</typeparam>
    public class Entity<TPrimaryKey> : IEntity<TPrimaryKey>
    {
        public TPrimaryKey Id { get; set; }

        public Entity() { }

        public Entity(TPrimaryKey id) : this()
        {
            Id = id;
        }

        public virtual IList<string> GetEntityIncludes() => new List<string>();
    }
}
