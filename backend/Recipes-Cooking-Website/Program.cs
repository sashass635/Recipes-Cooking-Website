using System.Text;
using Domain.Repositories;
using Infrastructure.Foundation;
using Infrastructure.Foundation.Repositories;
using Infrastructure.Implementations;
using Infrastructure.SecurityServices.JWTTokens;
using Infrastructure.SecurityServices.PasswordHasher;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

WebApplicationBuilder builder = WebApplication.CreateBuilder( args );

builder.Services.AddCors( options =>
{
    options.AddPolicy( "AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        } );
} );

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IRecipeRepository, RecipeRepository>();
builder.Services.AddScoped<ITagRepository, TagRepository>();
builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();
builder.Services.AddScoped<JwtProvider>();

builder.Services.Configure<AuthOptions>( builder.Configuration.GetSection( "AuthOptions" ) );

builder.Services.AddAuthentication( JwtBearerDefaults.AuthenticationScheme )
    .AddJwtBearer( options =>
    {
        var serviceProvider = builder.Services.BuildServiceProvider();
        var authOptions = serviceProvider.GetRequiredService<IOptions<AuthOptions>>().Value;

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey( Encoding.UTF8.GetBytes( authOptions.SecretKey ) ),
        };
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                context.Token = context.Request.Cookies[ "CookiesToken" ];
                return Task.CompletedTask;
            }
        };
    } );

string connectionString = builder.Configuration.GetConnectionString( "Recipes" );
builder.Services.AddDbContext<RecipesDbContext>( o =>
{
    o.UseSqlServer( connectionString,
        ob => ob.MigrationsAssembly( "Infrastructure.Migrations" ) );
} );

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

WebApplication app = builder.Build();

if ( app.Environment.IsDevelopment() )
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors( "AllowAll" );

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
