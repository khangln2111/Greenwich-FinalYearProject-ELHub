using Domain.Entities;
using LLL.AutoCompute.EFCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class EnrollmentConfiguration : IEntityTypeConfiguration<Enrollment>
{
    public void Configure(EntityTypeBuilder<Enrollment> builder)
    {
        builder.HasIndex(e => new { e.UserId, e.CourseId });
        builder.HasIndex(e => new { e.CourseId, e.ReviewId });
        builder.HasIndex(e => new { e.CourseId, e.Id });

        // Denormalized property for performance optimization
        builder
            .ComputedProperty(
                e => e.ProgressPercentage,
                e => e.Course.Sections.SelectMany(s => s.Lectures).Any()
                    ? (int)(
                        (double)e.LectureProgresses.Count(lp => lp.Completed)
                        / e.Course.Sections.SelectMany(s => s.Lectures).Count() * 100
                    )
                    : 0
            )
            .HasDefaultValue(0);
    }
}