using DAL.Constants;
using DAL.Data.Entities.MediaEntities;
using DAL.Data.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.Data.Configurations;

public class MediaConfiguration : IEntityTypeConfiguration<Media>
{
    public void Configure(EntityTypeBuilder<Media> builder)
    {
        builder.HasDiscriminator<MediaType>("MediaType")
            .HasValue<Media>(MediaType.Other)
            .HasValue<Media>(MediaType.Image)
            .HasValue<Media>(MediaType.Document)
            .HasValue<DurationMedia>(MediaType.Video)
            .HasValue<DurationMedia>(MediaType.Audio);

        builder.Property(m => m.Url)
            .HasMaxLength(AppConstants.Media.UrlMaxLength);

        builder.Property(m => m.LocalFilePath)
            .HasMaxLength(AppConstants.Media.LocalFilePathMaxLength);

        builder.Property(m => m.Extension)
            .HasMaxLength(AppConstants.Media.ExtensionMaxLength);

        // Indexing for faster lookups
        builder.HasIndex(m => m.Type);
    }
}