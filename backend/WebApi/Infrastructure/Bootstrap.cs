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
                PostgreSQLConnectionString = settings.Database.PostgreSQLConnectionString
            });

            var domainModule = new DomainModule(new DomainModuleSettings()
            {
                Environment = settings.Environment,
                EncryptionKey = settings.Authorization.EncryptionKey,
                ScrapeWebsiteUrl = settings.Scrapper.Primary
            });

            
            var webApiModule = new WebApiModule(new WebApiModuleSettings()
            {
                RootPassword = settings.Authorization.RootPassword,
                SecurityKey = settings.Authorization.SecurityKey
            });

            dataModule.ConfigureServices(services);
            domainModule.ConfigureServices(services);
            webApiModule.ConfigureServices(services);
        }
    }
}
