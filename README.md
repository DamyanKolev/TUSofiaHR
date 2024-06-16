Windows 
  Instalation
    1) install latest LTS nodejs version -> https://nodejs.org/en
    2) install NET 8.0 -> https://dotnet.microsoft.com/en-us/download/dotnet/8.0
    3) install PostgresQL 16 -> https://www.postgresql.org/download/
    4) install Visual Studio 2022 -> https://visualstudio.microsoft.com/vs/
  
  Database configuration
    1) create empty database named "diplom" 
  
  Lauch
    1) git clone https://github.com/DamyanKolev/TUSofiaHR.git
    2) cd reactapp
    3) npm run install
    4) open project in VisualStuido 2022
    5) Database init
        5.1) run in nuget package console "enable-migrations"
        5.2) run in nuget package console "update-database" and wait till database initialized
    6) Setting up two projects to run simultaneously
        6.1) Open "Configure Startup Projects"
        6.2) Click "Startup project"
        6.3) Click "Multiple startup projects"
        6.4) Set both projects to be "Start" in section "Action"
    7) After database is initialized, click Start in Visual Studio 




Linux
  Instalation
    1) install latest LTS nodejs version -> https://nodejs.org/en
    2) install NET 8.0 -> https://dotnet.microsoft.com/en-us/download/dotnet/8.0
    3) install PostgresQL 16 -> https://www.postgresql.org/download/
    4) install Visual Studio Code -> [https://visualstudio.microsoft.com/vs/](https://code.visualstudio.com/Download)

  Database configuration
    1) create empty database named "diplom"

  Lauch
    1) git clone https://github.com/DamyanKolev/TUSofiaHR.git

    Lauch ASP.NET project
      1) open project in Visual Studio Code
      2) Database init
        2.2) run in nuget package console "dotnet ef database update" and wait till database initialized
      3) run in console dotnet run
    Lauch React APP
      1) cd reactapp
      2) npm run install
      3) npm run dev
