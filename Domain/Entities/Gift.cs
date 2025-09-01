using Domain.Common;
using Domain.Enums;

namespace Domain.Entities;

public class Gift : BaseAuditableEntity
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