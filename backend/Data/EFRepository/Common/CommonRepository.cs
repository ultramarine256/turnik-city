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
        Task<DecodeIpDto> DecodeIp(string ip);
        Task<CountersEntity> GetCounters();
        Task<IEnumerable<NewMemberEntity>> NewMembers(int take = 10);
        Task<IEnumerable<NewPlaygroundEntity>> NewPlaygrounds(int take = 10);
    }

    internal class CommonRepository : BaseRepository, ICommonRepository
    {
        public IIpDecoder IpDecoder { get; }

        public CommonRepository(IContextManager dbContextManager, IMemoryCache cache, IIpDecoder ipDecoder) : base(dbContextManager, cache)
        {
            IpDecoder = ipDecoder;
        }

        public async Task<DecodeIpDto> DecodeIp(string ip)
        {
            var value = Cache.Get<DecodeIpDto>(ip);

            if (value == null)
            {
                // Not found, get from api
                value = await IpDecoder.DecodeIp(ip);

                // write it to the cache
                Cache.Set(ip, value, CacheOptions);
            }

            return value;
        }

        public async Task<CountersEntity> GetCounters()
        {
            var value = Cache.Get<CountersEntity>(CacheKeys.Counters);

            if (value == null)
            {
                // Not found, get from db
                var playgrounds = Context.Playgrounds.AsNoTracking()
                    .Where(r => r.Lat != 0)
                    .Select(r => new { address = r.Address, likesCount = r.LikesCount });
                var playgroundsCount = playgrounds.Count();
                var likesCount = playgrounds.Sum(r => r.likesCount);
                var usersCount = Context.Users.Count();

                value = new CountersEntity()
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

        public async Task<IEnumerable<NewMemberEntity>> NewMembers(int take = 10)
        {
            var list = Context.Users.AsNoTracking().OrderByDescending(r => r.CreatedUtc).Take(take).ToList();
            var dtos = list.Select(r => new NewMemberEntity()
            {
                Slug = r.Slug,
                ImageUrl = r.ImageUrl,
                FullName = r.FullName,
                InstagramId = r.InstagramId,
                CreatedUtc = r.CreatedUtc
            });
            return dtos;
        }

        public async Task<IEnumerable<NewPlaygroundEntity>> NewPlaygrounds(int take = 10)
        {
            var list = Context.Playgrounds.AsNoTracking().OrderByDescending(r => r.CreatedUtc).Take(take).ToList();
            var dtos = list.Select(r => new NewPlaygroundEntity()
            {
                Slug = r.Slug,
                Title = r.GetTitle(),
                ImageUrl = r.GetFirstImageUrl(),
                CreatedUtc = r.CreatedUtc,
                CreatedBy = r.CreatedBy,
                City = r.City
            });
            return dtos;
        }
    }
}
