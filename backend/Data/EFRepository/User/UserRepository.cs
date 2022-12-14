using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.EFRepository.Playground;
using Data.EFRepository.Playground.Models;
using Data.Entities;
using Data.Infrastructure.ContextManager;
using Data.ThirdParty.Storage;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Data.EFRepository.User
{
    public interface IUserRepository : IEntityRepository<UserEntity, int>
    {
        Task<UserEntity> GetUserByEmailAndPassword(string email, string password);
        Task<UserEntity> GetUserByEmail(string email);
    }

    internal class UserRepository : EntityRepository<UserEntity, int>, IUserRepository
    {
        public UserRepository(IContextManager dbContextManager, IStorageService storageService, IMemoryCache cache)
            : base(dbContextManager, storageService, cache) { }

        public Task<UserEntity> GetUserByEmailAndPassword(string email, string password) =>
            Context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(r => r.Email == email && r.PasswordHash == password);

        public Task<UserEntity> GetUserByEmail(string email) =>
            Context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(r => r.Email == email);
    }
}
