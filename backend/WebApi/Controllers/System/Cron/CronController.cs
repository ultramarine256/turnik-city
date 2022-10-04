using Data.Entities;
using Domain.DomainServices._Abstractions;
using Domain.DomainServices.Playground;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers.System.Cron
{
    [Route("cron")]
    public class CronController : Controller
    {
        public CronController() { }

        [HttpGet("do-staff")]
        public Task<int> ScrapePlaygrounds() => Task.FromResult(0);
    }
}
