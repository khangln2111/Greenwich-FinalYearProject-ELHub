using DAL.Constants;
using DAL.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.Data.Configurations;

public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        // Configure properties
        builder.Property(c => c.Name)
            .IsRequired()
            .HasMaxLength(CategoryConstants.NameMaxLength); // Limit the length of Name

        builder.Property(c => c.Description)
            .HasMaxLength(CategoryConstants.DescriptionMaxLength); // Limit the length of Description
    }
}