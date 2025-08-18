using DAL.Constants;
using DAL.Data.Entities;
using LLL.AutoCompute.EFCore;
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

        // Denormalized properties for performance optimization
        builder.ComputedProperty(
                s => s.LectureCount,
                s => s.Lectures.Count)
            .HasDefaultValue(0);

        builder
            .ComputedProperty(s => s.DurationInSeconds,
                s => s.Lectures.Sum(l => l.Video != null ? l.Video.DurationInSeconds : 0))
            .HasDefaultValue(0);
    }
}