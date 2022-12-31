using Domain.DomainServices.Authorization.Models;
using SendGrid;

namespace Domain.DomainServices.Authorization
{
    public interface IAuthorizationDomainService
    {
        Task<bool> IsUserExist(string email);
        Task RegisterNewUser(string email, string password);
        Task<UserAuthDetails> GetUserByEmail(string email, string password);
        Task<IdentityInfo> GetUserIdentityInfo(string email);
        Task<Response> SendConfirmationEmail(string email);
        Task<bool> ValidateConfirmationCode(string email, string code);
        Task<Response> SendPasswordResetEmail(string email, string passwordResetPageUrl);
        Task<bool> ChangeForgottenPassword(string newPassword, string passwordResetHash);
    }
}
