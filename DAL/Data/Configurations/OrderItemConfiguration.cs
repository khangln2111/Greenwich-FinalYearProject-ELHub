using DAL.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.Data.Configurations;

public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
{
    public void Configure(EntityTypeBuilder<OrderItem> builder)
    {
        builder.Property(oi => oi.Quantity)
            .IsRequired();

        builder.Property(oi => oi.Price)
            .IsRequired()
            .HasPrecision(18, 2);

        builder.Property(oi => oi.DiscountedPrice)
            .IsRequired()
            .HasPrecision(18, 2);

        builder.Property(oi => oi.OrderId)
            .IsRequired();

        builder.Property(oi => oi.CourseId)
            .IsRequired();
    }
}