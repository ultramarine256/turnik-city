namespace WebApi.Infrastructure.AppSettings
{
    public class AppSettings
    {
        public string Environment { get; set; }
        public AppDetails Details { get; }
        public AuthorizationSettings Authorization { get; }
        public DatabaseSettings Database { get; }
        public StorageSettings Storage { get; }
        public TelegramSettings Telegram { get; }
        public ScrapperSettings Scrapper { get; }

        public AppSettings()
        {
            Environment = String.Empty;
            Details = new AppDetails();
            Authorization = new AuthorizationSettings();
            Database = new DatabaseSettings();
            Storage = new StorageSettings();
            Telegram = new TelegramSettings();
            Scrapper = new ScrapperSettings();
        }

        public AppSettings MapFromConfiguration(IConfiguration configuration)
        {
            Environment = configuration["environment"];

            Details.Name = configuration["applicationInfo:name"];
            Details.Version = configuration["applicationInfo:version"];
            Details.BuildCounter = configuration["applicationInfo:buildCounter"];
            Details.DeployDateTimeUTC = configuration["applicationInfo:deployDateTimeUTC"];

            Authorization.EncryptionKey = configuration["authorization:encryptionKey"];
            Authorization.SecurityKey = configuration["authorization:securityKey"];
            Authorization.RootPassword = configuration["authorization:rootPassword"];

            Database.Host = configuration["database:host"];
            Database.Name = configuration["database:name"];
            Database.Login = configuration["database:login"];
            Database.Pass = configuration["database:pass"];

            Storage.AccountName = configuration["storage:accountName"];
            Storage.StorageKey = configuration["storage:storageKey"];
            Storage.ContainerName = configuration["storage:containerName"];

            Telegram.Token = configuration["telegram:token"];
            
            Scrapper.Primary = configuration["scrapper:primary"];

            return this;
        }

        public class AppDetails
        {
            public string Name { get; set; }
            public string Version { get; set; }
            public string BuildCounter { get; set; }
            public string DeployDateTimeUTC { get; set; }
        }

        public class AuthorizationSettings
        {
            public string SecurityKey { get; set; }
            public string EncryptionKey { get; set; }
            public string RootPassword { get; set; }
        }

        public class DatabaseSettings
        {
            public string Host { get; set; }
            public string Name { get; set; }
            public string Login { get; set; }
            public string Pass { get; set; }
            public string PostgreSQLConnectionString => $"Host={Host};Database={Name};Username={Login};Password={Pass}";
        }

        public class StorageSettings
        {
            public string AccountName { get; set; }
            public string StorageKey { get; set; }
            public string ContainerName { get; set; }
        }

        public class TelegramSettings
        {
            public string Token { get; set; }
        }

        public class ScrapperSettings
        {
            public string Primary { get; set; }
        }
    }

    public class ENVIRONMENT
    {
        public const string
            LOCAL = "Local",
            DEV = "Development",
            PROD = "Production";
    }

    public class CORS
    {
        public const string 
            ALLOW_ALL = "allow-all-cors";
    }
}
