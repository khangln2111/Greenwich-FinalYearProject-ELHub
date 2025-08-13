using DAL.Constants;
using DAL.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.Data.Configurations;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder
            .HasIndex(o => o.PaymentIntentId)
            .IsUnique();

        builder.Property(o => o.PaymentIntentId)
            .HasMaxLength(AppConstants.Order.PaymentIntentIdMaxLength);

        builder.Property(o => o.PaymentMethodType)
            .HasMaxLength(AppConstants.Order.PaymentMethodTypeMaxLength);

        builder.Property(o => o.PaymentMethodBrand)
            .HasMaxLength(AppConstants.Order.PaymentMethodBrandMaxLength);

        builder.Property(o => o.PaymentMethodLast4);
        builder.Property(o => o.PaymentMethodLast4)
            .HasMaxLength(AppConstants.Order.PaymentMethodLast4MaxLength);
    }
}