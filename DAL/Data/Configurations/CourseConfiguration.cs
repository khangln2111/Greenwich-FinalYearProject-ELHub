using DAL.Constants;
using DAL.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.Data.Configurations;

public class CourseConfiguration : IEntityTypeConfiguration<Course>
{
    public void Configure(EntityTypeBuilder<Course> builder)
    {
        builder.Property(c => c.Title)
            .IsRequired()
            .HasMaxLength(AppConstants.Course.TitleMaxLength); // Limit the length of Title

        builder.Property(c => c.Description)
            .HasMaxLength(AppConstants.Course.DescriptionMaxLength);

        builder.Property(c => c.Price)
            .HasColumnType("decimal(18,2)"); // Decimal format for Price

        builder.Property(c => c.DiscountedPrice)
            .HasColumnType("decimal(18,2)"); // Decimal format for Price


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
    }
}