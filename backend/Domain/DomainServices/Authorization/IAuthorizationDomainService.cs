using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Azure;
using Domain.Modules.Authorization.Models;

namespace Domain.DomainServices.Authorization
{
    public interface IAuthorizationDomainService
    {
        Task<IdentityInfo> GetIdentityInfoAsync(string email);
        Task<Response> SendPasswordResetEmail(string email, string passwordResetPageUrl);
        Task<bool> ChangeForgottenPassword(string newPassword, string passwordResetHash);
    }
}
