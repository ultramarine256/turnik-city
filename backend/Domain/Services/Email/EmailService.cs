using System.Net;
using Domain.Services.Email.Models;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Domain.Services.Email
{
    public class EmailService : IEmailService
    {
        public EmailAddress EmailFrom { get; }
        protected ISendGridClient SendGridClient { get; }
        public List<EmailAddress>? ForwardEmails { get; }
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
            ForwardEmails = forwardEmails;
        }

        public Task<Response> TdEmail(IList<EmailAddress> recipients, DoodleEmailData data, string type = EMAIL_TEMPLATE.DEALER)
        {
            var message = MailHelper.CreateSingleTemplateEmailToMultipleRecipients(
                EmailFrom,
                AddForwardRecipients(recipients.ToList(), ForwardEmails).ToList(),
                EMAIL_IDS.TD_OLD,
                data.AsSendGridObject(type));

            return SendGridClient.SendEmailAsync(message);
        }

        public Task<Response> ResetPasswordEmail(EmailAddress emailTo, string passwordResetPageUrl)
        {
            var message = MailHelper.CreateSingleTemplateEmail(
                EmailFrom,
                emailTo,
                EMAIL_IDS.RESET_PASSWORD,
                new { passwordResetPageUrl });

            return SendGridClient.SendEmailAsync(message);
        }

        public Task<Response> ConfirmationCodeEmail(EmailAddress emailTo, string code)
        {
            var template = MailHelper.CreateSingleEmail(
                EmailFrom,
                emailTo,
                "TurnikCity Confirmation Code",
                $"{code}",
                $"{code}");

            return SendGridClient.SendEmailAsync(template);
        }

        private IList<EmailAddress> AddForwardRecipients(List<EmailAddress> regularEmail, List<EmailAddress>? forwardEmails)
        {
            if (forwardEmails == null)
            {
                return regularEmail;
            }

            forwardEmails = forwardEmails.Where(r => !String.IsNullOrEmpty(r.Email)).ToList();
            regularEmail.AddRange(forwardEmails);
            return regularEmail;
        }
    }

    public class EMAIL_IDS
    {
        public const string TD_OLD = "d-efcf2738ccca438f97d34fef84305349";
        public const string SURVEY = "d-6cb25ecda3b0455cbfac657fb9eab9ab";
        public const string RESET_PASSWORD = "d-db4392cd4f52486eaaa63871d1841534";
    }
}
