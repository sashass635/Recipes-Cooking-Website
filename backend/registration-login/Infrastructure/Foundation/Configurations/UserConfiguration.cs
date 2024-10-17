﻿using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Foundation.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure( EntityTypeBuilder<User> builder )
        {
            builder.ToTable( nameof( User ) )
                .HasKey( c => c.Id );

            builder.Property( t => t.Name )
                .IsRequired()
                .HasMaxLength( 100 );

            builder.Property( t => t.Login )
                .IsRequired()
                .HasMaxLength( 100 );

            builder.Property( t => t.Password )
                .IsRequired()
                .HasMaxLength( 200 );
        }
    }
}
