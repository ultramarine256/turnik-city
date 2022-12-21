using Domain.Services.Email.Models;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Domain.Services.Email
{
    public interface IEmailService
    {
        Task<Response> DoodleEmail(IList<EmailAddress> recipients, DoodleEmailData data, string type);
        Task<Response> ResetPassword(EmailAddress emailTo, string passwordResetPageUrl);
    }
}
