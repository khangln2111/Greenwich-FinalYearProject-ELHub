using DAL.Constants;
using DAL.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.Data.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<ApplicationUser>
{
    public void Configure(EntityTypeBuilder<ApplicationUser> builder)
    {
        builder.Property(x => x.FirstName)
            .HasMaxLength(AppConstants.User.FirstNameMaxLength);

        builder.Property(x => x.LastName)
            .HasMaxLength(AppConstants.User.LastNameMaxLength);

        builder.Property(x => x.Address)
            .HasMaxLength(AppConstants.User.AddressMaxLength);

        builder.Property(x => x.Bio)
            .HasMaxLength(AppConstants.User.BioMaxLength);
    }
}