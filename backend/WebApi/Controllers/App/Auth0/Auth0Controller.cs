using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers.App.Auth0
{
    [Route("auth0")]
    [Authorize]
    public class Auth0Controller : Controller
    {

    }
}
