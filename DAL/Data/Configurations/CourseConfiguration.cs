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
            .HasMaxLength(CourseConstants.TitleMaxLength); // Limit the length of Title

        builder.Property(c => c.Description)
            .HasMaxLength(CourseConstants.DescriptionMaxLength);

        builder.Property(c => c.Price)
            .HasColumnType("decimal(18,2)"); // Decimal format for Price

        builder.Property(c => c.DiscountedPrice)
            .HasColumnType("decimal(18,2)"); // Decimal format for Price


        builder.Property(c => c.Status)
            .HasMaxLength(CourseConstants.StatusMaxLength);


        builder.Property(c => c.Level)
            .HasMaxLength(CourseConstants.LevelMaxLength);


        builder.Property(c => c.Prerequisites)
            .HasMaxLength(CourseConstants.PrerequisitesMaxLength);

        builder.Property(c => c.LearningOutcomes)
            .HasMaxLength(CourseConstants.LearningOutcomesMaxLength);


        builder.HasOne(c => c.Instructor)
            .WithMany()
            .HasForeignKey(c => c.InstructorId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}