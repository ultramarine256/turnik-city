using Azure;
using Domain.DomainServices.Authorization.Models;

namespace Domain.DomainServices.Authorization
{
    public interface IAuthorizationDomainService
    {
        Task<bool> IsUserExist(string email);
        Task RegisterNewUser(string email, string password);
        Task<UserAuthDetails> GetUserDetails(string email, string password);
        Task<IdentityInfo> GetUserIdentityInfo(string email);
        Task<Response> SendConfirmationCodeEmail(string email, string passwordResetPageUrl);
        Task<Response> SendPasswordResetEmail(string email, string passwordResetPageUrl);
        Task<bool> ChangeForgottenPassword(string newPassword, string passwordResetHash);
    }
}
