using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using WebApi.Controllers.System.ApiStatus.Dtos;
using WebApi.Infrastructure.AppSettings;

namespace WebApi.Controllers.System.ApiStatus
{
    [ApiController]
    public class ApiStatusController : Controller
    {
        public AppSettings AppSettings { get; }

        public ApiStatusController(AppSettings appSettings)
        {
            AppSettings = appSettings;
        }

        [HttpGet("")]
        public Task<ApiStatusDto> ApiStatus()
        {
            var result = new ApiStatusDto(
                AppSettings.Details.Name,
                AppSettings.Details.Version,
                AppSettings.Details.BuildCounter,
                AppSettings.Details.DeployDateTimeUTC,
                AppSettings.Environment,
                AppSettings.Database.Name,
                "https://api.turnik.city/swagger");
            return Task.FromResult(result);
        }
    }
}
