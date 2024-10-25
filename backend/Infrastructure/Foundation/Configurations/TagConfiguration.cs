using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Recipes.Domain.Entities;

namespace Recipes.Infrastructure.DataAccess.Tags;

public class TagConfiguration : IEntityTypeConfiguration<Tag>
{
    public void Configure( EntityTypeBuilder<Tag> builder )
    {
        builder.ToTable( nameof( Tag ) )
            .HasKey( r => r.Id );

        builder.Property( t => t.Name )
            .IsRequired()
            .HasMaxLength( 50 );

        builder.HasMany( t => t.RecipeTags )
               .WithOne( rt => rt.Tag )
               .HasForeignKey( rt => rt.TagId )
               .OnDelete( DeleteBehavior.Cascade );
    }
}