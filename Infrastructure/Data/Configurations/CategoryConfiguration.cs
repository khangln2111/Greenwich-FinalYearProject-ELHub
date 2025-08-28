using Domain.Constants;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        // Configure properties
        builder.Property(c => c.Name)
            .IsRequired()
            .HasMaxLength(AppConstants.Category.NameMaxLength); // Limit the length of Name
    }
}