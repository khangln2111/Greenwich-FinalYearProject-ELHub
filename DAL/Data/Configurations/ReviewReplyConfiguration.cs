using DAL.Constants;
using DAL.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.Data.Configurations;

public class ReviewReplyConfiguration : IEntityTypeConfiguration<ReviewReply>
{
    public void Configure(EntityTypeBuilder<ReviewReply> builder)
    {
        builder.Property(x => x.Content)
            .HasMaxLength(AppConstants.ReviewReply.ContentMaxLength)
            .IsRequired();

        builder.HasOne(x => x.Review)
            .WithOne(x => x.Reply)
            .HasForeignKey<ReviewReply>(x => x.ReviewId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}