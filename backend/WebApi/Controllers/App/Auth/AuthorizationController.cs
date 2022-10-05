using Domain.DomainServices.Authorization;
using Domain.Session;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers.App.Auth
{
    [Route("auth")]
    [Authorize]
    public class AuthorizationController : Controller
    {
        public IAppSession Session { get; }
        public IAuthorizationDomainService Domain { get; }

    }
}
