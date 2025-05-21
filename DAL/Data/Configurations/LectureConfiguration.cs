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
            .HasMaxLength(LectureConstants.TitleMaxLength); // Limit the length of Title

        builder.Property(l => l.Description)
            .HasMaxLength(LectureConstants.DescriptionMaxLength); // Limit the length of Description
    }
}