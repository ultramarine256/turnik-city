using Data.EFRepository.Playground.Models;
using Data.Entities;
using Domain.DomainServices.Playground;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using WebApi.Controllers._Abstract;
using WebApi.Controllers.App.Playground.Dtos;

namespace WebApi.Controllers.App.Playground
{
    [Route("playground")]
    [Authorize]
    public class PlaygroundController : EntityController<PlaygroundEntity, int, PlaygroundDto>
    {
        public new IPlaygroundDomainService Domain { get; }

        public PlaygroundController(IPlaygroundDomainService domain) : base(domain)
        {
            Domain = domain;
        }

        [AllowAnonymous]
        [EnableQuery]
        [HttpGet("")]
        public IEnumerable<PlaygroundDto> Get()
            =>  BaseQueryEnumerable();

        [AllowAnonymous]
        [HttpGet("{id}")]
        public Task<PlaygroundDto> GetById(int id)
            => BaseGetAsync(id);

        [HttpPost]
        public Task<PlaygroundDto> CreateAsync([FromBody] PlaygroundDto request)
            => BaseCreateAsync(request);

        [HttpPut]
        public Task<PlaygroundDto> UpdateAsync([FromBody] PlaygroundDto request)
            => BaseUpdateAsync(request);

        [HttpDelete("{id}")]
        public Task DeleteAsync(int id)
            => BaseDelete(id);

        [AllowAnonymous]
        [HttpGet("markers")]
        public Task<IEnumerable<PlaygroundMarker>> Markers()
            => Domain.GetMarkers();
    }
}
