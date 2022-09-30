using Data.EFRepository.Playground.Models;
using Data.Entities;
using Data.Infrastructure.ContextManager;
using Data.ThirdParty.Storage;
using Microsoft.Extensions.Caching.Memory;

namespace Data.EFRepository.Playground
{
    public interface IPlaygroundRepository : IEntityRepository<PlaygroundEntity, int>
    {
        public IEnumerable<PlaygroundMarker> GetMarkers();
    }

    public class PlaygroundRepository : EntityRepository<PlaygroundEntity, int>, IPlaygroundRepository
    {
        private readonly IMemoryCache _cache;
        private MemoryCacheEntryOptions _cacheOptions;

        public PlaygroundRepository(IContextManager dbContextManager, IStorageService storageService, IMemoryCache cache)
            : base(dbContextManager, storageService)
        {
            _cache = cache;
            _cacheOptions = new MemoryCacheEntryOptions().SetAbsoluteExpiration(relative: TimeSpan.FromDays(1));
        }

        public IEnumerable<PlaygroundMarker> GetMarkers()
        {
            var value = _cache.Get<IList<PlaygroundMarker>>("myModelCacheKey");

            if (value == null)
            {
                // Not found, get from DB
                value = Query.Select(r =>
                    new PlaygroundMarker()
                    {
                        Caption = r.Slug,
                        Lat = r.Lat,
                        Lng = r.Lng
                    }).ToList();

                // write it to the cache
                _cache.Set("myModelCacheKey", value, _cacheOptions);
            }

            return value;
        }
    }
}
