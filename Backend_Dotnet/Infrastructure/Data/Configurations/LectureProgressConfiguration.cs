using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class LectureProgressConfiguration : IEntityTypeConfiguration<LectureProgress>
{
    public void Configure(EntityTypeBuilder<LectureProgress> builder)
    {
        builder
            .HasOne(lp => lp.Lecture)
            .WithMany(l => l.LectureProgresses)
            .HasForeignKey(lp => lp.LectureId)
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .HasOne(lp => lp.Enrollment)
            .WithMany(l => l.LectureProgresses)
            .HasForeignKey(lp => lp.EnrollmentId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}