using Domain.DomainServices._Abstractions;
using Domain.DomainServices.Common;
using Domain.Infrastructure.Authorization;
using Domain.Policy;
using Microsoft.Extensions.DependencyInjection;
using Domain.DomainServices.Playground;
using Domain.Policy._Abstract;
using Domain.Policy._Abstract.Permission;
using Domain.Policy.Playground;
using Domain.DomainServices.Authorization;
using Domain.DomainServices.User;
using Domain.Services.Email;
using Domain.Services.Email.Models;
using SendGrid.Helpers.Mail;
using SendGrid;

namespace Domain
{
    public class DomainModule
    {
        public DomainModuleSettings Settings { get; }

        public DomainModule(DomainModuleSettings settings)
        {
            Settings = settings;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            // domain services
            services.Add(ServiceDescriptor.Scoped(typeof(IEntityDomainService<,>), typeof(EntityDomainService<,>)));
            services.Add(ServiceDescriptor.Scoped(typeof(IEntityExtendedDomainService<,>), typeof(EntityExtendedDomainService<,>)));
            services.AddScoped<CommonDomainService, CommonDomainService>();
            services.AddScoped<IAuthorizationDomainService, AuthorizationDomainService>();
            services.AddScoped<IPlaygroundDomainService, PlaygroundDomainService>();
            services.AddScoped<IUserDomainService, UserDomainService>();

            // policy
            services.AddScoped<IPermissionChecker, PermissionChecker>();
            services.Add(ServiceDescriptor.Scoped(typeof(IEntityPolicy<,>), typeof(NullEntityPolicy<,>)));
            services.Add(ServiceDescriptor.Scoped(typeof(IEntityExtendedPolicy<,>), typeof(NullEntityExtendedPolicy<,>)));
            services.AddScoped<IPlaygroundPolicy, PlaygroundPolicy>();

            // services
            services.AddSingleton<IPasswordEncryptor>(sp => new PasswordEncryptor(Settings.EncryptionKey, Settings.RootPassword));
            services.AddSingleton<IEmailService>(sp => new EmailService(
                new SendGridClient(Settings.SendGridApiKey),
                new EmailAddress(EMAIL_CONSTANTS.EMAIL_FROM, EMAIL_CONSTANTS.COMPANY_NAME),
                new List<EmailAddress>()));
        }
    }

    public class DomainModuleSettings
    {
        public string Environment { get; }
        public string EncryptionKey { get; }
        public string RootPassword { get;  }
        public string SendGridApiKey { get; }

        public DomainModuleSettings(string environment, string encryptionKey, string rootPassword, string sendGridApiKey)
        {
            Environment = environment;
            EncryptionKey = encryptionKey;
            RootPassword = rootPassword;
            SendGridApiKey = sendGridApiKey;
        }
    }
}
