namespace DAL.Data.Entities;

public class Inventory : BaseEntity
{
    public Guid ApplicationUserId { get; init; }

    public ApplicationUser ApplicationUser { get; init; } = null!;

    public ICollection<InventoryItem> InventoryItems { get; init; } = new List<InventoryItem>();
}