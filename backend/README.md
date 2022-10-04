# TurnikCity API
This repository contains TurnikCity API sources.
Support: [ultramarine256@gmail.com](ultramarine256@gmail.com)

## Configure
1. Run ```cd ./WebApi```
2. Copy ```launchSettings.json``` to ```Properties```
3. Copy ```appsettings.TEMPLATE.json``` to ```appsettings.Local.json```
4. Fill ```appsettings.Local.json``` with valid credentials

## Development
1. Run ```cd ./WebApi```
2. Run ```$Env:ASPNETCORE_ENVIRONMENT = "Local"```
3. Launch the project using ```dotnet run```
4. Open ```http://localhost:13203/swagger``` in browser

## Publish
1. Run ```dotnet publish -c:Release -o:./publish```

## DB Migrations
1. Run ```cd ./Data```
2. Run ```dotnet ef database update``` to Update Database
3. Run ```dotnet ef migrations add 'asd'``` to Create Migration

More details on [ef-core tools](https://learn.microsoft.com/en-us/ef/core/cli/dotnet)
