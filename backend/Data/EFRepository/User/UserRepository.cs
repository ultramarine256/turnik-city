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
        Task<bool> IsUserSlugExist(string slug);
        Task<bool> CheckConfirmationCode(string email, string code);
        Task SetConfirmationCode(string email, string code);
    }

    internal class UserRepository : EntityRepository<UserEntity, int>, IUserRepository
    {
        public UserRepository(IContextManager dbContextManager, IStorageService storageService, IMemoryCache cache)
            : base(dbContextManager, storageService, cache) { }

        public Task<UserEntity> GetUserByEmailAndPassword(string email, string password) =>
            Query.FirstOrDefaultAsync(r => r.Email == email && r.PasswordHash == password)!;

        public Task<UserEntity> GetUserByEmail(string email) =>
            Query.FirstOrDefaultAsync(r => r.Email == email)!;

        public Task<bool> IsUserSlugExist(string slug)
            => Task.FromResult(Query.Any(r => r.Slug == slug));

        public Task<bool> CheckConfirmationCode(string email, string code)
            => Task.FromResult(code == Cache.Get<string>(email));
        

        public Task SetConfirmationCode(string email, string code)
            => Task.FromResult(Cache.Set(email, code));
    }
}
