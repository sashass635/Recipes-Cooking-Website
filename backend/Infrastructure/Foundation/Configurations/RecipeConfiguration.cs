using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Foundation.Configurations
{
    public class RecipeConfiguration : IEntityTypeConfiguration<Recipe>
    {
        public void Configure( EntityTypeBuilder<Recipe> builder )
        {
            builder.ToTable( nameof( Recipe ) )
                .HasKey( r => r.Id );

            builder.Property( t => t.AuthorId )
               .IsRequired();

            builder.Property( r => r.Name )
                .IsRequired()
                .HasMaxLength( 100 );

            builder.Property( r => r.Description )
                .IsRequired()
                .HasMaxLength( 200 );

            builder.Property( r => r.CookTime )
                .IsRequired()
                .HasMaxLength( 200 );

            builder.Property( r => r.PortionCount )
                .IsRequired()
                .HasMaxLength( 50 );

            builder.Property( r => r.ImageUrl )
                .IsRequired();

            builder.HasMany( r => r.Ingredients )
                .WithOne( i => i.Recipe )
                .HasForeignKey( i => i.RecipeId )
                .OnDelete( DeleteBehavior.Cascade );

            builder.HasMany( r => r.Steps )
                .WithOne( s => s.Recipe )
                .HasForeignKey( s => s.RecipeId )
                .OnDelete( DeleteBehavior.Cascade );

            builder.HasMany( r => r.RecipeTags )
               .WithOne( rt => rt.Recipe )
               .HasForeignKey( rt => rt.RecipeId )
               .OnDelete( DeleteBehavior.Cascade );
        }
    }
}