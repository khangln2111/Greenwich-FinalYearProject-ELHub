using DAL.Constants;
using DAL.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.Data.Configurations;

public class NotificationConfiguration : IEntityTypeConfiguration<Notification>
{
    public void Configure(EntityTypeBuilder<Notification> builder)
    {
        builder.Property(x => x.Title)
            .HasMaxLength(AppConstants.Notification.TitleMaxLength);

        builder.Property(x => x.Content)
            .HasMaxLength(AppConstants.Notification.ContentMaxLength);

        builder.Property(x => x.Url)
            .HasMaxLength(AppConstants.Notification.UrlMaxLength);
    }
}