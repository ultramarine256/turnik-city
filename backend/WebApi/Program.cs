using Microsoft.AspNetCore.OData;
using WebApi.Infrastructure;
using WebApi.Infrastructure.AppSettings;

var builder = WebApplication.CreateBuilder(args);
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: CORS.ALLOW_ALL,
        builder =>
        {
            builder.WithOrigins(
                    "https://turnik.city",
                    "http://localhost:4601")
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

// Memory Cache
builder.Services.AddMemoryCache();

// Add services to the container.
builder.Services
    .AddControllers()
    .AddOData(options =>
    {
        options.Select().Expand().Filter().OrderBy().SetMaxTop(100).Count();
        options.EnableNoDollarQueryOptions = true;
    });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// App Settings
var appSettings = new AppSettings().MapFromConfiguration(builder.Configuration);
builder.Services.AddSingleton(appSettings);

// Configure Services
new Bootstrap().ConfigureServices(builder.Services, appSettings);

var app = builder.Build();

// Debug staff...
if (app.Environment.IsEnvironment("Local")) { }
app.UseDeveloperExceptionPage();

// Swagger
app.UseSwagger();
app.UseSwaggerUI();

// Cors
app.UseCors(CORS.ALLOW_ALL);

// Authorization
app.UseAuthentication();
app.UseAuthorization();

// Startup
app.MapControllers();
app.Run();
