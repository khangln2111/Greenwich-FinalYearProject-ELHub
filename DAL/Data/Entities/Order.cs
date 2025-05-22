using DAL.Data.Enums;

namespace DAL.Data.Entities;

public class Order : BaseEntity
{
    public OrderStatus Status { get; set; }

    public Guid ApplicationUserId { get; set; }

    public ApplicationUser ApplicationUser { get; set; } = null!;

    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public string? PaymentIntentId { get; set; }
}