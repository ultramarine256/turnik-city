using Domain.Services.Email.Models;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Domain.Services.Email
{
    public interface IEmailService
    {
        Task<Response> TdEmail(IList<EmailAddress> recipients, DoodleEmailData data, string type);
        Task<Response> ResetPasswordEmail(EmailAddress emailTo, string passwordResetPageUrl);
        Task<Response> ConfirmationCodeEmail(EmailAddress emailTo, string code);
    }
}
