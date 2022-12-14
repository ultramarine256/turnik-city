using Data;
using Domain;

namespace WebApi.Infrastructure
{
    public class Bootstrap
    {
        public void ConfigureServices(IServiceCollection services, AppSettings.AppSettings settings)
        {
            var dataModule = new DataModule(new DataModuleSettings()
            {
                AccountName = settings.Storage.AccountName,
                StorageKey = settings.Storage.StorageKey,
                ContainerName = settings.Storage.ContainerName,
                PostgreSQLConnectionString = settings.Database.PostgreSQLConnectionString,
                IPStackApiKey = settings.IpStackApiKey
            });

            var domainModule = new DomainModule(new DomainModuleSettings(
                settings.Environment,
                settings.Authorization.EncryptionKey,
                settings.Authorization.RootPassword,
                settings.SendGridApiKey
            ));

            var webApiModule = new WebApiModule(new WebApiModuleSettings()
            {
                SecurityKey = settings.Authorization.SecurityKey
            });

            dataModule.ConfigureServices(services);
            domainModule.ConfigureServices(services);
            webApiModule.ConfigureServices(services);
        }
    }
}
