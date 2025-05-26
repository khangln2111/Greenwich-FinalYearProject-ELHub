using DAL.Data.Enums;

namespace DAL.Data.Entities;

public class Order : BaseEntity
{
    public OrderStatus Status { get; set; } = OrderStatus.Incomplete;

    public Guid UserId { get; set; }

    public ApplicationUser User { get; set; } = null!;

    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public string? PaymentIntentId { get; set; }
}