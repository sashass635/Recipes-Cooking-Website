using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class RecipeTagConfiguration : IEntityTypeConfiguration<RecipeTag>
{
    public void Configure( EntityTypeBuilder<RecipeTag> builder )
    {
        builder.ToTable( nameof( RecipeTag ) )
               .HasKey( rt => new { rt.RecipeId, rt.TagId } );

        builder.HasOne( rt => rt.Recipe )
               .WithMany( r => r.RecipeTags )
               .HasForeignKey( rt => rt.RecipeId )
               .OnDelete( DeleteBehavior.Cascade );

        builder.HasOne( rt => rt.Tag )
               .WithMany( t => t.RecipeTags )
               .HasForeignKey( rt => rt.TagId )
               .OnDelete( DeleteBehavior.Cascade );
    }
}