using Data.EFRepository.Common;
using Data.EFRepository.Common.Models;
using Data.ThirdParty.IPStack.Models;

namespace Domain.DomainServices.Common
{
    public class CommonDomainService
    {
        public ICommonRepository CommonRepository { get; }

        public CommonDomainService(ICommonRepository commonRepository)
        {
            CommonRepository = commonRepository;
        }

        public Task<DecodeIpDto> DecodeIp(string ip)
            => CommonRepository.DecodeIp(ip);

        public Task<CountersEntity> Counters()
            => CommonRepository.GetCounters();

        public Task<IEnumerable<NewMemberEntity>> NewMembers()
            => CommonRepository.NewMembers();

        public Task<IEnumerable<NewPlaygroundEntity>> NewPlaygrounds()
            => CommonRepository.NewPlaygrounds();
    }
}
