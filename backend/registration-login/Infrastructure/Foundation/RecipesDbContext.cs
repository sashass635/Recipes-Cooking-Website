using Microsoft.EntityFrameworkCore;
using Infrastructure.Foundation.Configurations;

namespace Infrastructure.Foundation;

public class RecipesDbContext : DbContext
{
    public RecipesDbContext( DbContextOptions<RecipesDbContext> options )
        : base( options )
    {
    }

    public RecipesDbContext()
    {
    }

    protected override void OnConfiguring( DbContextOptionsBuilder optionsBuilder )
    {
        optionsBuilder.UseSqlServer( "Server=ALEXANDRA\\SQLEXPRESS;Database=Theater;Trusted_Connection=True;TrustServerCertificate=True;" );
    }

    protected override void OnModelCreating( ModelBuilder modelBuilder )
    {
        base.OnModelCreating( modelBuilder );

        modelBuilder.ApplyConfiguration( new UserConfiguration() );

    }
}