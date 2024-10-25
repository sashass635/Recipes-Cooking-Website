using Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Recipes.Domain.Entities;

namespace Infrastructure.Foundation.Configurations
{
    public class IngredientConfiguration : IEntityTypeConfiguration<Ingredient>
    {
        public void Configure( EntityTypeBuilder<Ingredient> builder )
        {
            builder.ToTable( nameof( Ingredient ) )
                .HasKey( i => i.Id );

            builder.Property( i => i.Title )
           .IsRequired()
           .HasMaxLength( 50 );

            builder.Property( i => i.Description )
                .IsRequired()
                .HasMaxLength( 250 );

            builder.Property( i => i.RecipeId )
                .IsRequired();

            builder.HasOne( i => i.Recipe )
                .WithMany( r => r.Ingredients )
                .HasForeignKey( i => i.RecipeId )
                .OnDelete( DeleteBehavior.Cascade );
        }
    }
}