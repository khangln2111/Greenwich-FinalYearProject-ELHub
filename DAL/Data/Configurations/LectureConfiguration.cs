using DAL.Constants;
using DAL.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.Data.Configurations;

public class LectureConfiguration : IEntityTypeConfiguration<Lecture>
{
    public void Configure(EntityTypeBuilder<Lecture> builder)
    {
        builder.Property(l => l.Title)
            .IsRequired()
            .HasMaxLength(AppConstants.Lecture.TitleMaxLength); // Limit the length of Title

        builder.Property(l => l.Description)
            .HasMaxLength(AppConstants.Lecture.DescriptionMaxLength); // Limit the length of Description

        // Indexing for faster lookups
        builder.HasIndex(x => new { x.SectionId, x.Id });
    }
}