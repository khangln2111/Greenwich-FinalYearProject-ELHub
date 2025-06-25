using DAL.Data.Enums;

namespace DAL.Data.Entities;

public class Gift : BaseEntity
{
    public Guid GiverId { get; set; }

    public ApplicationUser Giver { get; set; } = null!;

    public required string ReceiverEmail { get; set; }

    public Guid InventoryItemId { get; set; }

    public InventoryItem InventoryItem { get; set; } = null!;

    public GiftStatus Status { get; set; } = GiftStatus.Pending;

    public DateTime? RedeemedAt { get; set; }

    public DateTime? RevokedAt { get; set; }
}