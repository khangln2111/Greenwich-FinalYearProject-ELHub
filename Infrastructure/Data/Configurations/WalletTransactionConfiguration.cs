using Domain.Constants;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class WalletTransactionConfiguration : IEntityTypeConfiguration<WalletTransaction>
{
    public void Configure(EntityTypeBuilder<WalletTransaction> builder)
    {
        builder.Property(wt => wt.Amount)
            .HasPrecision(18, 2);

        builder.Property(wt => wt.Type)
            .HasMaxLength(AppConstants.WalletTransaction.TypeMaxLength);


        builder.Property(wt => wt.Description)
            .HasMaxLength(AppConstants.WalletTransaction.DescriptionMaxLength);

        builder.HasOne(wt => wt.User)
            .WithMany(u => u.WalletTransactions)
            .HasForeignKey(wt => wt.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}