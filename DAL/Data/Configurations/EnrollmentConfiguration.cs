using DAL.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.Data.Configurations;

public class EnrollmentConfiguration : IEntityTypeConfiguration<Enrollment>
{
    public void Configure(EntityTypeBuilder<Enrollment> builder)
    {
        builder.HasIndex(e => new { e.UserId, e.CourseId });
        builder.HasIndex(e => new { e.CourseId, e.ReviewId });
        builder.HasIndex(e => new { e.CourseId, e.Id });
    }
}