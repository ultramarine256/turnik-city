using Data.EFContext;
using Data.Infrastructure.ContextManager;

namespace Data.EFRepository
{
    public class BaseRepository
    {
        protected IContextManager DbContextManager { get; }
        public AppDbContext Context => DbContextManager.BuildOrCurrentContext();

        public BaseRepository(IContextManager dbContextManager)
        {
            DbContextManager = dbContextManager;
            DbContextManager.BuildOrCurrentContext();
        }
    }
}
