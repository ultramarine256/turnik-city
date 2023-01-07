using Data.Entities;
using Domain.DomainServices._Abstractions;
using Domain.DomainServices.User;
using Domain.DomainServices.User.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using WebApi.Controllers._Abstract;
using WebApi.Controllers.App.User.Dtos;

namespace WebApi.Controllers.App.User
{
    [Route("user")]
    public class UserController : EntityController<UserEntity, int, UserDto>
    {
        public IUserDomainService Domain { get; }

        public UserController(IUserDomainService domain) : base(domain)
        {
            Domain = domain;
        }

        [EnableQuery]
        [HttpGet("")]
        public IEnumerable<UserDto> Get()
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

        [HttpGet("profile/{slug}")]
        [AllowAnonymous]
        public Task<UserProfileDto> UserProfile(string slug)
            => Domain.UserProfile(slug);
    }
}
