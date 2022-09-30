using Data.Entities;
using Domain.DomainServices._Abstractions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using WebApi.Controllers._Abstract;
using WebApi.Controllers.App.User.Dtos;

namespace WebApi.Controllers.App.User
{
    [Route("user")]
    public class UserController : EntityController<UserEntity, int, UserDto>
    {
        public UserController(IEntityDomainService<UserEntity, int> domain) : base(domain)
        { }

        [EnableQuery]
        [HttpGet("")]
        public IQueryable<object> Get()
            => BaseQuery();

        [HttpGet("{id}")]
        public Task<UserDto> GetById(int id)
            => BaseGetAsync(id);

        [HttpPost]
        public Task<UserDto> CreateAsync([FromBody] UserDto request)
            => BaseCreateAsync(request);

        [HttpPut]
        public Task<UserDto> UpdateAsync([FromBody] UserDto request)
            => BaseUpdateAsync(request);

        [HttpDelete("{id}")]
        public Task DeleteAsync(int id)
            => BaseDelete(id);
    }
}
