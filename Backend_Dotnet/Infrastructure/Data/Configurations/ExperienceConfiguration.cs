using Domain.Constants;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class ExperienceConfiguration : IEntityTypeConfiguration<Experience>
{
    public void Configure(EntityTypeBuilder<Experience> builder)
    {
        builder.Property(x => x.OrganizationName)
            .HasMaxLength(AppConstants.Experience.OrganizationNameMaxLength);

        builder.Property(x => x.Title)
            .HasMaxLength(AppConstants.Experience.TitleMaxLength);
    }
}