using Domain.Common;

namespace Domain.Entities;

public class Inventory : BaseAuditableEntity
{
    public Guid UserId { get; init; }

    public ApplicationUser User { get; init; } = null!;

    public ICollection<InventoryItem> InventoryItems { get; set; } = new List<InventoryItem>();
}