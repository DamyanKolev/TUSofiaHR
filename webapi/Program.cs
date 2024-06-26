using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using webapi;
using webapi.Models.Auth;
using webapi.Services.Auth;
using webapi.Services.HR;
using webapi.Services.References;
using webapi.Services.System;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;


builder.Services.AddControllers()
    .AddNewtonsoftJson();

//Automapper service
builder.Services.AddAutoMapper(cfg => { cfg.AddProfile<MapperProfile>(); });

// Human Resources services
builder.Services.AddScoped<IAddressService, AddressService>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IContractService, ContractService>();
builder.Services.AddScoped<IPersonalDataService, PersonalDataService>();
builder.Services.AddScoped<ICompanyService, CompanyService>();
builder.Services.AddScoped<IDepartmentService, DepartmentService>();
builder.Services.AddScoped<IPositionService, PositionService>();
builder.Services.AddScoped<IEmployeeContractService, EmployeeContractService>();
builder.Services.AddScoped<IInitService, InitService>();
builder.Services.AddScoped<IEndMonthService, EndMonthService>();


//Reference services
builder.Services.AddScoped<IArticle62Service, Article62Service>();
builder.Services.AddScoped<IDeclaration1Service, Declaration1Service>();
builder.Services.AddScoped<IDeclaration6Service, Declaration6Service>();



// Auth services
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
builder.Services.AddScoped<IJWTService, JWTService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IRoleService, RoleService>();


// System service
builder.Services.AddScoped<ISysAdministrativeTerritoryService, SysAdministrativeTerritoryService>();
builder.Services.AddScoped<ISysContractTerminationTypeService, SysContractTerminationTypeService>();
builder.Services.AddScoped<ISysContractTypeService, SysContractTypeService>();
builder.Services.AddScoped<ISysIconomicActivityService, SysIconomicActivityService>();
builder.Services.AddScoped<ISysPositionService, SysPositionService>(); 
builder.Services.AddScoped<ISysContractDocumentTypeService, SysContractDocumentTypeService>();
builder.Services.AddScoped<ISysPaymentTypeService, SysPaymentTypeService>();
builder.Services.AddScoped<ISysInsuranceTypesService, SysInsuranceTypesService>();



builder.Services.AddIdentity<User, Role>()
    .AddEntityFrameworkStores<DatabaseContext>()
    .AddDefaultTokenProviders();

// Add Authentication service to the container.
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = config["JWT:ValidAudience"],
        ValidIssuer = config["JWT:ValidIssuer"],
        ClockSkew = TimeSpan.Zero,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JWT:Secret"]!))
    };
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DatabaseContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DatabaseContext"))
        .UseSnakeCaseNamingConvention().EnableSensitiveDataLogging();
});




var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
    options.RoutePrefix = string.Empty;
});

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
