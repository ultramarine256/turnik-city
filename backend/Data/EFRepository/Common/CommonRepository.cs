using Data.EFRepository.Common.Models;
using Data.Infrastructure.ContextManager;
using Data.ThirdParty.IPStack;
using Data.ThirdParty.IPStack.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Data.EFRepository.Common
{
    public interface ICommonRepository
    {
        public Task<DecodeIpModel> DecodeIp(string ip);
        public Task<CountersModel> GetCounters();
    }

    public class CommonRepository : BaseRepository, ICommonRepository
    {
        public IIpDecoder IpDecoder { get; }

        public CommonRepository(IContextManager dbContextManager, IMemoryCache cache, IIpDecoder ipDecoder) : base(dbContextManager, cache)
        {
            IpDecoder = ipDecoder;
        }

        public async Task<DecodeIpModel> DecodeIp(string ip)
        {
            var value = Cache.Get<DecodeIpModel>(ip);

            if (value == null)
            {
                // Not found, get from api
                value = await IpDecoder.DecodeIp(ip);

                // write it to the cache
                Cache.Set(ip, value, CacheOptions);
            }

            return value;
        }

        public async Task<CountersModel> GetCounters()
        {
            var value = Cache.Get<CountersModel>(CacheKeys.Counters);

            if (value == null)
            {
                // Not found, get from db
                var playgrounds = Context.Playgrounds.AsNoTracking()
                    .Where(r => r.Lat != 0)
                    .Select(r => new { address = r.Address, likesCount = r.LikesCount });
                var playgroundsCount = playgrounds.Count();
                var likesCount = playgrounds.Sum(r => r.likesCount);
                var usersCount = Context.Users.Count();

                value = new CountersModel()
                {
                    Playgrounds = playgroundsCount,
                    Cities = 100,
                    Likes = likesCount,
                    Users = usersCount
                };

                // write it to the cache
                Cache.Set(CacheKeys.Counters, value, CacheOptions);
            }

            return value;
        }
    }


}
