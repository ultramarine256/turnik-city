using Data.EFContext;
using Data.Infrastructure.ContextManager;
using Microsoft.Extensions.Caching.Memory;

namespace Data.EFRepository
{
    public class BaseRepository
    {
        protected IContextManager DbContextManager { get; }
        public AppDbContext Context => DbContextManager.BuildOrCurrentContext();
        protected IMemoryCache Cache { get; }
        protected readonly MemoryCacheEntryOptions CacheOptions = new MemoryCacheEntryOptions().SetAbsoluteExpiration(relative: TimeSpan.FromDays(10));

        public BaseRepository(IContextManager contextManager, IMemoryCache cache)
        {
            DbContextManager = contextManager;
            DbContextManager.BuildOrCurrentContext(); // TODO: simplify
            Cache = cache;
        }
    }

    public static class CacheKeys
    {
        public const string
            Playground = "playgroundCacheKey",
            Counters = "counters";
    }
}
