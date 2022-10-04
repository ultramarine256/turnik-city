using System.Net;
using Data.EFContext;
using Data.EFRepository;
using Data.EFRepository.Playground;
using Data.Infrastructure.ContextManager;
using Data.Infrastructure.UnitOfWork;
using Data.ThirdParty.Storage;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Data
{
    public class DataModule
    {
        public DataModuleSettings Settings { get; }

        public DataModule(DataModuleSettings settings)
        {
            Settings = settings;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AppDbContext>(options => options.UseNpgsql(Settings.PostgreSQLConnectionString), ServiceLifetime.Transient);
            services.AddScoped<IContextManager, ContextManager>();
            services.AddTransient<IAppUnitOfWorkManager, AppUnitOfWorkManager>();

            // repositories
            services.Add(ServiceDescriptor.Transient(typeof(IEntityRepository<,>), typeof(EntityRepository<,>)));
            services.Add(ServiceDescriptor.Transient(typeof(IEntityRepositoryX<,>), typeof(EntityRepositoryX<,>)));
            services.AddTransient<IPlaygroundRepository, PlaygroundRepository>();

            // services
            services.AddSingleton<IStorageService>(sp => new StorageService(
                Settings.AccountName,
                Settings.StorageKey,
                Settings.ContainerName));
        }
    }

    public class DataModuleSettings
    {
        public string? PostgreSQLConnectionString { get; set; }
        public string? AccountName { get; set; }
        public string? StorageKey { get; set; }
        public string? ContainerName { get; set; }
    }
}
