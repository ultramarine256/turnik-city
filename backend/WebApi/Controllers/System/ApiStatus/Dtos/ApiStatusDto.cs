namespace WebApi.Controllers.System.ApiStatus.Dtos
{
    public class ApiStatusDto
    {
        public string Name { get; set; }
        public string Version { get; set; }
        public string BuildCounter { get; set; }
        public string LastDeployDateTimeUTC { get; set; }
        public string Environment { get; set; }
        public string DataBase { get; set; }
        public string SwaggerUrl { get; set; }

        public ApiStatusDto(
            string name,
            string version,
            string buildCounter,
            string lastDeployDateTimeUtc,
            string environment,
            string dataBase,
            string swaggerUrl)
        {
            Name = name;
            Version = version;
            BuildCounter = buildCounter;
            LastDeployDateTimeUTC = lastDeployDateTimeUtc;
            Environment = environment;
            DataBase = dataBase;
            SwaggerUrl = swaggerUrl;
        }
    }
}
