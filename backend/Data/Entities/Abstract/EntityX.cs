namespace Data.Entities.Abstract
{
    public class EntityX<TPrimaryKey> : Entity<TPrimaryKey>, IOrderable, IPassivable
    {
        public int Order { get; set; }
        public bool IsActive { get; set; }

        public virtual string GroupedProperty() => throw new NotImplementedException();
    }
}
