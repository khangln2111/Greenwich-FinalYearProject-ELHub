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
            .HasMaxLength(150); // Limit the length of Title

        builder.Property(c => c.Description)
            .HasMaxLength(1500);

        builder.Property(c => c.Price)
            .HasColumnType("decimal(18,2)"); // Decimal format for Price

        builder.Property(c => c.DiscountPercentage)
            .HasDefaultValue(0); // Default value is 0 if no discount

        builder.Property(c => c.Level)
            .HasMaxLength(50);

        builder.Property(c => c.Prerequisites)
            .HasMaxLength(1000);

        builder.Property(c => c.LearningOutcomes)
            .HasMaxLength(1000);

        builder.HasOne(c => c.Instructor)
            .WithMany()
            .HasForeignKey(c => c.InstructorId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}