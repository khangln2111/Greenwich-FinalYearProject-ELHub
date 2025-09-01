using Domain.Common;

namespace Domain.Entities;

public class Cart : BaseAuditableEntity
{
    public Guid UserId { get; init; }

    public ApplicationUser User { get; init; } = null!;

    public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
}