namespace DAL.Data.Entities;

public class Inventory : BaseEntity
{
    public Guid UserId { get; init; }

    public ApplicationUser User { get; init; } = null!;

    public ICollection<InventoryItem> InventoryItems { get; init; } = new List<InventoryItem>();
}