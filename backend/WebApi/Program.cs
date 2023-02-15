using System.IO.Compression;
using Microsoft.AspNetCore.OData;
using Microsoft.AspNetCore.ResponseCompression;
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
        options.Select().Expand().OrderBy().Count();
        options.Filter();
        options.EnableNoDollarQueryOptions = true;
    });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// App Settings
var appSettings = new AppSettings().MapFromConfiguration(builder.Configuration);
builder.Services.AddSingleton(appSettings);

// Compression
builder.Services.AddResponseCompression(opt =>
{
    opt.Providers.Add<BrotliCompressionProvider>();
    opt.Providers.Add<GzipCompressionProvider>();
    opt.EnableForHttps = true;
});
builder.Services.Configure<BrotliCompressionProviderOptions>(options => options.Level = CompressionLevel.Fastest);
builder.Services.Configure<GzipCompressionProviderOptions>(options => options.Level = CompressionLevel.Fastest);

// Configure Services
new Bootstrap().ConfigureServices(builder.Services, appSettings);

var app = builder.Build();

// Debug stuff...
if (app.Environment.IsEnvironment("Local")) { app.UseDeveloperExceptionPage(); } else { app.UseExceptionHandler("/error"); }

// Swagger
app.UseSwagger();
app.UseSwaggerUI();

// Cors
app.UseCors(CORS.ALLOW_ALL);

// Authorization
app.UseAuthentication();
app.UseAuthorization();

// Compression
app.UseResponseCompression();

// Startup
app.MapControllers();
app.Run();
