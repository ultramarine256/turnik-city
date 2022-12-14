using Domain.Services.Email.Models;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Domain.Services.Email
{
    public interface IEmailService
    {
        Task<Response> DoodleEmail(IList<EmailAddress> recipients, AppointmentEmailData data, string type);
        Task<Response> ResetPassword(EmailAddress emailTo, string passwordResetPageUrl);
    }
}
