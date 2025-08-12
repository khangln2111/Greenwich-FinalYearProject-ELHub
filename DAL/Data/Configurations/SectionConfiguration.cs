using DAL.Constants;
using DAL.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.Data.Configurations;

public class SectionConfiguration : IEntityTypeConfiguration<Section>
{
    public void Configure(EntityTypeBuilder<Section> builder)
    {
        builder.Property(x => x.Title)
            .IsRequired()
            .HasMaxLength(AppConstants.Section.TitleMaxLength);

        builder.Property(x => x.Description)
            .HasMaxLength(AppConstants.Section.DescriptionMaxLength);

        builder.HasIndex(s => new { s.CourseId, s.Id });
    }
}