using Azure;
using Data.EFContext;
using Data.EFRepository.User;
using Data.Entities;
using Data.Entities.Abstract;
using Data.Infrastructure.UnitOfWork;
using Domain.DomainServices.Authorization.Models;
using Domain.Infrastructure.Authorization;
using Domain.Policy._Abstract;
using Domain.Services.Email;
using Microsoft.EntityFrameworkCore;

namespace Domain.DomainServices.Authorization
{
    public class AuthorizationDomainService : IAuthorizationDomainService
    {
        public IEmailService EmailService { get; }
        public IUserRepository UserRepository { get; }
        public IAppUnitOfWorkManager UowManager { get; }
        public IPasswordEncryptor PasswordEncryptor { get; }
        public AppDbContext Context { get; }

        public AuthorizationDomainService(
            IEmailService emailService,
            IUserRepository userRepository,
            IAppUnitOfWorkManager uowManager,
            IPasswordEncryptor passwordEncryptor,
            AppDbContext context)
        {
            EmailService = emailService;
            UserRepository = userRepository;
            UowManager = uowManager;
            PasswordEncryptor = passwordEncryptor;
            Context = context;
        }

        public Task<bool> IsUserExist(string email)
            => Context.Users.AnyAsync(r => r.Email == email);

        public async Task RegisterNewUser(string email, string password)
        {
            var user = new UserEntity()
            {
                FirstName = "Rocky",
                Email = email,
                PasswordHash = password,
                Role = USER_ROLE.ANONYMOUS,
                CreatedUtc = DateTime.UtcNow
            };

            using var uow = UowManager.CurrentOrCreateNew();
            await UserRepository.CreateAsync(user);
            await uow.CompleteAsync();
        }

        public async Task<UserAuthDetails> GetUserDetails(string email, string password)
        {
            var passwordHash = PasswordEncryptor.EncryptPassword(password.Trim());
            var user = await UserRepository.GetUserByEmailAndPassword(email, passwordHash);

            // get root user
            if (password == PasswordEncryptor.GetRootPassword())
            {
                user = await UserRepository.GetUserByEmail(email);
            }

            return new UserAuthDetails()
            {
                User = user
            };
        }

        public async Task<IdentityInfo> GetUserIdentityInfo(string email)
        {
            var user = await UserRepository.GetUserByEmail(email);

            if (user == null)
            {
                throw new UnauthorizedAccessException("Token is valid, but not for this instance.");
            }

            var result = new IdentityInfo(
                user.Email,
                user.ImageUrl,
                $"{user.FirstName?.Trim()} {user.LastName?.Trim()}",
                PolicyExtensions.GetRoleNameById(user.Role),
                PolicyExtensions.GetRolePermissions(user.Role));

            return result;
        }

        public Task<Response> SendConfirmationCodeEmail(string email, string passwordResetPageUrl) => throw new NotImplementedException();

        public async Task<Response> SendPasswordResetEmail(string userEmail, string passwordResetPageUrl)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> ChangeForgottenPassword(string newPassword, string passwordResetHash)
        {
            throw new NotImplementedException();
        }
    }
}
