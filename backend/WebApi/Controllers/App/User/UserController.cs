﻿using Data.Entities;
using Domain.DomainServices.User;
using Domain.DomainServices.User.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("")]
        public IEnumerable<UserDto> Query()
            => BaseQuery();

        [HttpGet("{id}")]
        public Task<UserDto> Get(int id)
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
