using Azure.Core;
using Domain.Infrastructure.Exceptions;
using Microsoft.AspNetCore.Diagnostics;
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

        [Route("/error")]
        public IActionResult HandleError()
        {
            var exceptionHandlerFeature = HttpContext.Features.Get<IExceptionHandlerFeature>()!;

            var type = exceptionHandlerFeature.Error.GetType();

            if (type == typeof(EntityNotFoundException))
            {
                return NotFound(new { status = "not-found" });
            }

            return Problem(
                title: exceptionHandlerFeature.Error.Message,
                detail: exceptionHandlerFeature.Error.InnerException?.Message);
        }
    }
}
