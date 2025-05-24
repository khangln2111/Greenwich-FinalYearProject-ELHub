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
            .HasMaxLength(UserConstants.FirstNameMaxLength);

        builder.Property(x => x.LastName)
            .HasMaxLength(UserConstants.LastNameMaxLength);

        builder.Property(x => x.Address)
            .HasMaxLength(UserConstants.AddressMaxLength);

        builder.Property(x => x.Bio)
            .HasMaxLength(UserConstants.BioMaxLength);
    }
}