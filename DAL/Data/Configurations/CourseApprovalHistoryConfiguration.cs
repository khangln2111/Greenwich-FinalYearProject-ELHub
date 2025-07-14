using DAL.Constants;
using DAL.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.Data.Configurations;

public class CourseApprovalHistoryConfiguration : IEntityTypeConfiguration<CourseApprovalHistory>
{
    public void Configure(EntityTypeBuilder<CourseApprovalHistory> builder)
    {
        builder.Property(c => c.Note)
            .HasMaxLength(AppConstants.CourseApprovalHistory.NoteMaxLength);
    }
}