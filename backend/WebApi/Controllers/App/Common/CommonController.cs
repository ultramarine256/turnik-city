using Data.EFRepository.Common.Entities;
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
        public Task<DecodeIpDto> DecodeIp(string ip)
            => CommonDomainService.DecodeIp(ip);

        [HttpGet("counters")]
        public Task<CountersEntity> Counters()
            => CommonDomainService.Counters();

        [HttpGet("new-members")]
        public Task<IEnumerable<NewMemberEntity>> NewMembers()
            => CommonDomainService.NewMembers();

        [HttpGet("new-playgrounds")]
        public Task<IEnumerable<NewPlaygroundEntity>> NewPlaygrounds()
            => CommonDomainService.NewPlaygrounds();
    }
}
