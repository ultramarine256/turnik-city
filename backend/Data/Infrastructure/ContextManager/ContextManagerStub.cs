using Data.EFContext;

namespace Data.Infrastructure.ContextManager
{
    public class ContextManagerStub : IContextManager
    {
        public AppDbContext CurrentContext { get; }

        public ContextManagerStub(AppDbContext context)
        {
            CurrentContext = context;
        }

        public void BuildContext()
        {
        }

        public void DisposeContext()
        {
        }

        public AppDbContext BuildOrCurrentContext()
        {
            return CurrentContext;
        }

        public AppDbContext BuildOrCurrentContext(out bool createdNew)
        {
            createdNew = false;
            return CurrentContext;
        }

        public AppDbContext BuildNewContext()
        {
            return CurrentContext;
        }
    }
}
