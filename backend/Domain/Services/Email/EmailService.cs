using System.Net;
using System.Text;
using Domain.Infrastructure.Extensions;
using Domain.Services.Email.Models;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Domain.Services.Email
{
    public class EmailService : IEmailService
    {
        public EmailAddress EmailFrom { get; }
        protected ISendGridClient SendGridClient { get; }
        public List<EmailAddress> ForwardEmails { get; }
        public WebClient WebClient { get; }

        public EmailService(ISendGridClient sendGridClient, EmailAddress emailFrom)
        {
            SendGridClient = sendGridClient;
            EmailFrom = emailFrom;
            ForwardEmails = new List<EmailAddress>();
            WebClient = new WebClient();
        }

        public EmailService(ISendGridClient sendGridClient, EmailAddress emailFrom, List<EmailAddress> forwardEmails) : this(sendGridClient, emailFrom)
        {
            // ForwardEmails = forwardEmails;
            // TODO: fix email forwarding
        }

        public Task<Response> DoodleEmail(IList<EmailAddress> recipients, DoodleEmailData data, string type = EMAIL_TEMPLATE.DEALER)
        {
            var message = MailHelper.CreateSingleTemplateEmailToMultipleRecipients(
                EmailFrom,
                AddForwardingEmail(recipients.ToList(), ForwardEmails).ToList(),
                EMAIL_IDS.DOODLE,
                data.AsSendGridObject(type));

            return SendGridClient.SendEmailAsync(message);
        }

        public Task<Response> ResetPassword(EmailAddress emailTo, string passwordResetPageUrl)
        {
            var message = MailHelper.CreateSingleTemplateEmail(
                EmailFrom,
                emailTo,
                EMAIL_IDS.RESET_PASSWORD,
                new { passwordResetPageUrl });

            return SendGridClient.SendEmailAsync(message);
        }

        #region Helpers

        private IList<EmailAddress> AddForwardingEmail(List<EmailAddress> regularEmail, List<EmailAddress> forwardEmails)
        {
            if (forwardEmails != null)
            {
                forwardEmails = forwardEmails.Where(r => !string.IsNullOrEmpty(r.Email)).ToList();
                regularEmail.AddRange(forwardEmails);
            }
            return regularEmail;
        }

        #endregion
    }

    public class EMAIL_IDS
    {
        public const string DOODLE = "d-efcf2738ccca438f97d34fef84305349";
        public const string SURVEY = "d-6cb25ecda3b0455cbfac657fb9eab9ab";
        public const string RESET_PASSWORD = "d-db4392cd4f52486eaaa63871d1841534";
    }
}
