using Domain.Constants;
using Domain.Entities;
using LLL.AutoCompute.EFCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

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

        builder.Property(x => x.ProfessionalTitle)
            .HasMaxLength(AppConstants.User.ProfessionalTitleMaxLength);

        builder.Property(x => x.About)
            .HasMaxLength(AppConstants.User.AboutMaxLength);

        builder.Property(x => x.FavoriteQuote)
            .HasMaxLength(AppConstants.User.FavoriteQuoteMaxLength);

        builder.Property(x => x.FavoriteQuoteCite)
            .HasMaxLength(AppConstants.User.FavoriteQuoteCiteMaxLength);

        builder.ComputedProperty(x => x.Balance, x => x.WalletTransactions.Sum(w => w.Amount))
            .HasPrecision(18, 2);
    }
}