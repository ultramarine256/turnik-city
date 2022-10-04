using Domain.DomainServices._Abstractions;
using Domain.Infrastructure.Authorization;
using Domain.Policy;
using Microsoft.Extensions.DependencyInjection;
using Domain.DomainServices.Playground;
using Domain.Policy._Abstract;
using Domain.Policy._Abstract.Permission;
using Domain.Policy.Playground;
using Domain.Services.IpDecoder;

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
            services.AddScoped<IPlaygroundDomainService, PlaygroundDomainService>();

            // policy
            services.AddScoped<IPermissionChecker, PermissionChecker>();
            services.Add(ServiceDescriptor.Scoped(typeof(IEntityPolicy<,>), typeof(NullEntityPolicy<,>)));
            services.Add(ServiceDescriptor.Scoped(typeof(IEntityExtendedPolicy<,>), typeof(NullEntityExtendedPolicy<,>)));
            services.AddScoped<IPlaygroundPolicy, PlaygroundPolicy>();

            // services
            services.AddSingleton<IIpDecoder>(sp => new IpDecoder(Settings.IpstackApiKey));
            services.AddSingleton<IPasswordEncryptor>(sp => new PasswordEncryptor(Settings.EncryptionKey));
        }
    }

    public class DomainModuleSettings
    {
        public string? Environment { get; set; }
        public string? IpstackApiKey { get; set; }
        public string? EncryptionKey { get; set; }
        public string? ScrapeWebsiteUrl { get; set; }
    }
}
