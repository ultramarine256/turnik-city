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

        public Task<DecodeIpModel> DecodeIp(string ip)
            => CommonRepository.DecodeIp(ip);

        public Task<CountersModel> Counters()
            => CommonRepository.GetCounters();
    }
}
