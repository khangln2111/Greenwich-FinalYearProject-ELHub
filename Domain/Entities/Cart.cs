namespace Domain.Entities;

public class Cart : BaseEntity
{
    public Guid UserId { get; init; }

    public ApplicationUser User { get; init; } = null!;

    public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
}