using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class CartItemConfiguration : IEntityTypeConfiguration<CartItem>
{
    public void Configure(EntityTypeBuilder<CartItem> builder)
    {
        builder.Property(ci => ci.Quantity)
            .IsRequired()
            .HasDefaultValue(1); // Default quantity is 1 if not specified


        builder.HasOne(ci => ci.Cart)
            .WithMany(c => c.CartItems)
            .HasForeignKey(ci => ci.CartId)
            .OnDelete(DeleteBehavior.Cascade); // Cascade delete if Cart is deleted

        builder.HasOne(ci => ci.Course)
            .WithMany()
            .HasForeignKey(ci => ci.CourseId)
            .OnDelete(DeleteBehavior.Cascade); // Restrict delete if Course is deleted
    }
}