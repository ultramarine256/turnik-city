namespace Data.Entities.Abstract
{
    public interface IPassivable
    {
        bool IsActive { get; set; }
        string GroupedProperty();
    }
}
