using Domain.Repositories;
using Infrastructure.Foundation;
using Infrastructure.Foundation.Repositories;
using Infrastructure.Implementations;
using Infrastructure.SecurityServices.PasswordHasher;
using Microsoft.EntityFrameworkCore;

WebApplicationBuilder builder = WebApplication.CreateBuilder( args );

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();

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

app.UseAuthorization();

app.MapControllers();

app.Run();
