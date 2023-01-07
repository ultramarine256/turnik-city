using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.EFRepository.User;
using Data.Entities;
using Data.Infrastructure.UnitOfWork;
using Domain.DomainServices._Abstractions;
using Domain.DomainServices.User.Models;
using Domain.Infrastructure.Exceptions;
using Domain.Policy._Abstract;

namespace Domain.DomainServices.User
{
    public interface IUserDomainService : IEntityDomainService<UserEntity, int>
    {
        Task<UserProfileDto> UserProfile(string slug);
    }

    public class UserDomainService : EntityDomainService<UserEntity, int>, IUserDomainService
    {
        public IUserRepository UserRepository { get; }

        public UserDomainService(
            IEntityPolicy<UserEntity, int> policy,
            IUserRepository userRepository,
            IAppUnitOfWorkManager uowManager) : base(policy, userRepository, uowManager)
        {
            UserRepository = userRepository;
        }

        public async Task<UserProfileDto> UserProfile(string slug)
        {
            var entity = await UserRepository.FirstOrDefaultAsync(r => r.Slug == slug);

            if (entity == null)
            {
                throw new EntityNotFoundException("not-found");
            }

            var dto = new UserProfileDto()
            {
                Email = entity.Email,
                ImageUrl = entity.ImageUrl,
                FullName = entity.FullName,
                Bio = entity.Bio,
                InstagramId = entity.InstagramId,
                TelegramId = entity.TelegramId,
                City = entity.City,
            };

            return dto;
        }
    }
}
