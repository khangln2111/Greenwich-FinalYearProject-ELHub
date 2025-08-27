using DAL.Constants;
using DAL.Data.Entities;
using LLL.AutoCompute.EFCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.Data.Configurations;

public class CourseConfiguration : IEntityTypeConfiguration<Course>
{
    public void Configure(EntityTypeBuilder<Course> builder)
    {
        builder.Property(c => c.Title)
            .IsRequired()
            .HasMaxLength(AppConstants.Course.TitleMaxLength);

        builder.Property(c => c.Description)
            .HasMaxLength(AppConstants.Course.DescriptionMaxLength);

        builder.Property(c => c.Summary)
            .HasMaxLength(AppConstants.Course.SummaryMaxLength);

        builder.Property(c => c.Price)
            .HasPrecision(18, 2);

        builder.Property(c => c.DiscountedPrice)
            .HasPrecision(18, 2);


        builder.Property(c => c.Status)
            .HasMaxLength(AppConstants.Course.StatusMaxLength);


        builder.Property(c => c.Level)
            .HasMaxLength(AppConstants.Course.LevelMaxLength);


        builder.Property(c => c.Prerequisites)
            .HasMaxLength(AppConstants.Course.PrerequisitesMaxLength);

        builder.Property(c => c.LearningOutcomes)
            .HasMaxLength(AppConstants.Course.LearningOutcomesMaxLength);


        builder.HasOne(c => c.Instructor)
            .WithMany(i => i.Courses)
            .HasForeignKey(c => c.InstructorId)
            .OnDelete(DeleteBehavior.NoAction);


        builder
            .ComputedProperty(
                c => c.DurationInSeconds,
                c => c.Sections.SelectMany(s => s.Lectures)
                    .Where(l => l.Video != null)
                    .Sum(l => l.Video!.DurationInSeconds))
            .HasDefaultValue(0);

        builder
            .ComputedProperty(
                c => c.SectionCount,
                c => c.Sections.Count)
            .HasDefaultValue(0);

        builder
            .ComputedProperty(
                c => c.LectureCount,
                c => c.Sections.SelectMany(s => s.Lectures).Count())
            .HasDefaultValue(0);

        builder
            .ComputedProperty(
                c => c.EnrollmentCount,
                c => c.Enrollments.Count)
            .HasDefaultValue(0);

        builder
            .ComputedProperty(
                c => c.ReviewCount,
                c => c.Enrollments.Count(e => e.Review != null))
            .HasDefaultValue(0);

        builder
            .ComputedProperty(
                c => c.AverageRating,
                c => c.Enrollments
                    .Where(e => e.Review != null)
                    .Select(e => (double?)e.Review!.Rating)
                    .Average() ?? 0.0)
            .HasDefaultValue(0.0);
    }
}