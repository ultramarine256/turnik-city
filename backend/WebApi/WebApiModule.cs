using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Domain.Session;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using WebApi.Infrastructure.Authorization.Token;
using WebApi.Infrastructure.HttpContextAccessor;

namespace WebApi
{
    public class WebApiModule
    {
        public WebApiModuleSettings Settings { get; }

        public WebApiModule(WebApiModuleSettings settings)
        {
            Settings = settings;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            // infrastructure
            services.AddSingleton<ITokenAuthorization>(sp => new TokenAuthorization(
                Settings.SecurityKey,
                Settings.RootPassword));
            services.AddScoped<IAppSession, AppHttpContextAccessor>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            // authorization
            services.AddTransient<JwtSecurityTokenHandler, JwtSecurityTokenHandler>();
            services.AddAuthentication(options =>
                {
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.IncludeErrorDetails = true;
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Settings.SecurityKey)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
        }
    }

    public class WebApiModuleSettings
    {
        public string SecurityKey { get; set; } = null!;
        public string RootPassword { get; set; } = null!;
    }
}
