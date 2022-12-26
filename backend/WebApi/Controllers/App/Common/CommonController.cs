using Data.EFRepository.Common.Models;
using Data.ThirdParty.IPStack.Models;
using Domain.DomainServices.Common;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers.App.Common
{
    [Route("common")]
    public class CommonController : Controller
    {
        public CommonDomainService CommonDomainService { get; }

        public CommonController(CommonDomainService commonDomainService)
        {
            CommonDomainService = commonDomainService;
        }

        [HttpGet("decode-ip")]
        public Task<DecodeIpModel> DecodeIp(string ip)
            => CommonDomainService.DecodeIp(ip);

        [HttpGet("counters")]
        public Task<CountersModel> Counters()
            => CommonDomainService.Counters();

        [HttpGet("members")]
        public Task<IEnumerable<Member>> Members()
            => CommonDomainService.NewMembers();
    }
}
