using Domain.Constants;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class ReviewConfiguration : IEntityTypeConfiguration<Review>
{
    public void Configure(EntityTypeBuilder<Review> builder)
    {
        builder.Property(x => x.Content)
            .HasMaxLength(AppConstants.Review.ContentMaxLength);

        builder.HasOne(r => r.Enrollment)
            .WithOne(e => e.Review)
            .HasForeignKey<Review>(r => r.EnrollmentId) // Review is dependent on Enrollment
            .OnDelete(DeleteBehavior.Cascade);

        // Indexing for faster lookups
        builder.HasIndex(x => new { x.Rating, x.EnrollmentId });
    }
}