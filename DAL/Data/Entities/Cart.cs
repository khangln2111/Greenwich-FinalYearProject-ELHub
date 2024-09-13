namespace DAL.Data.Entities;

public class Cart : BaseEntity
{
    public Guid ApplicationUserId { get; init; }
    public ApplicationUser ApplicationUser { get; init; } = null!;

    public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
}