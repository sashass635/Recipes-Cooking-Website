using Microsoft.EntityFrameworkCore;
using Infrastructure.Foundation.Configurations;
using Recipes.Infrastructure.DataAccess.Tags;
using Recipes.Infrastructure.DataAccess.Steps;

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
        optionsBuilder.UseSqlServer( "Server=ALEXANDRA\\SQLEXPRESS;Database=Recipes;Trusted_Connection=True;TrustServerCertificate=True;" );
    }

    protected override void OnModelCreating( ModelBuilder modelBuilder )
    {
        base.OnModelCreating( modelBuilder );

        modelBuilder.ApplyConfiguration( new UserConfiguration() );
        modelBuilder.ApplyConfiguration( new RecipeConfiguration() );
        modelBuilder.ApplyConfiguration( new TagConfiguration() );
        modelBuilder.ApplyConfiguration( new RecipeTagConfiguration() );
        modelBuilder.ApplyConfiguration( new IngredientConfiguration() );
        modelBuilder.ApplyConfiguration( new StepConfiguration() );

    }
}