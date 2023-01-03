using Data.EFRepository.Common.Models;
using Data.Entities;
using Data.Infrastructure.ContextManager;
using Data.ThirdParty.IPStack;
using Data.ThirdParty.IPStack.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json.Linq;

namespace Data.EFRepository.Common
{
    public interface ICommonRepository
    {
        Task<DecodeIpModel> DecodeIp(string ip);
        Task<CountersModel> GetCounters();
        Task<IEnumerable<Member>> NewMembers();
    }

    internal class CommonRepository : BaseRepository, ICommonRepository
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

            value.NewUsers = Context.Users.AsNoTracking().OrderByDescending(r => r.CreatedUtc).Take(10).ToList();
            value.NewPlaygorounds = Context.Playgrounds.AsNoTracking().OrderByDescending(r => r.CreatedUtc).Take(10).ToList();

            return value;
        }

        public async Task<IEnumerable<Member>> NewMembers()
        {
            var users = Context.Users.AsNoTracking().OrderByDescending(r => r.CreatedUtc).Take(10).ToList();
            var members = users.Select(r => new Member()
            {
                ImageUrl = r.ImageUrl,
                FullName = r.FullName,
                InstagramId = r.InstagramId,
                CreatedUtc = r.CreatedUtc
            });
            return members;
        }
    }
}
