using Domain.Enums;

namespace Domain.Entities;

public class WalletTransaction : BaseEntity
{
    public Guid UserId { get; set; }
    public ApplicationUser User { get; set; } = null!;
    public decimal Amount { get; set; }
    public WalletTransactionType Type { get; set; }
    public string? Description { get; set; }
}