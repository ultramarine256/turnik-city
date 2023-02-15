using Data.EFRepository.Playground.Models;
using Data.Entities;
using Data.Infrastructure.ContextManager;
using Data.ThirdParty.Storage;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Data.EFRepository.Playground
{
    public interface IPlaygroundRepository : IEntityRepository<PlaygroundEntity, int>
    {
        public IEnumerable<PlaygroundMarker> GetMarkers();
    }

    internal class PlaygroundRepository : EntityRepository<PlaygroundEntity, int>, IPlaygroundRepository
    {
        public PlaygroundRepository(IContextManager dbContextManager, IStorageService storageService, IMemoryCache cache)
            : base(dbContextManager, storageService, cache) { }

        public IEnumerable<PlaygroundMarker> GetMarkers()
        {
            var value = Cache.Get<IList<PlaygroundMarker>>(CacheKeys.Playground);

            if (value == null)
            {
                // Not found, get from DB
                value = Query.Where(r => r.Lat != 0).Select(r =>
                    new PlaygroundMarker()
                    {
                        Id = r.Id,
                        Type = r.Type,
                        Lat = r.Lat,
                        Lng = r.Lng
                    }).ToList();

                // write it to the cache
                Cache.Set(CacheKeys.Playground, value, CacheOptions);
            }

            return value;
        }
    }
}
