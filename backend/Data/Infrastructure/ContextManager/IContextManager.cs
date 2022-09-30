using Data.EFContext;

namespace Data.Infrastructure.ContextManager
{
    public interface IContextManager
    {
        AppDbContext CurrentContext { get; }
        void BuildContext();
        void DisposeContext();
        AppDbContext BuildOrCurrentContext();
        AppDbContext BuildOrCurrentContext(out bool createdNew);
        AppDbContext BuildNewContext();
    }
}
