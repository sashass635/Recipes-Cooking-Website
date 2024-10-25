using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Recipes.Domain.Entities;

namespace Recipes.Infrastructure.DataAccess.Steps;

public class StepConfiguration : IEntityTypeConfiguration<Step>
{
    public void Configure( EntityTypeBuilder<Step> builder )
    {
        builder.ToTable( nameof( Step ) )
            .HasKey( r => r.Id );

        builder.Property( s => s.StepNumber )
            .IsRequired();

        builder.Property( s => s.StepDescription )
               .IsRequired()
               .HasMaxLength( 1000 );

        builder.HasOne( s => s.Recipe )
               .WithMany( r => r.Steps )
               .HasForeignKey( s => s.RecipeId )
               .OnDelete( DeleteBehavior.Cascade );
    }
}