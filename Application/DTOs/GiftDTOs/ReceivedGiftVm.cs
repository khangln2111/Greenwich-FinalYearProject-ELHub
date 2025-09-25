namespace Application.DTOs.GiftDTOs;

public class ReceivedGiftVm
{
    public Guid Id { get; set; }

    public required string GiverName { get; set; }

    public required string GiverEmail { get; set; }

    public required string GiftName { get; set; }
    public string? GiftImageUrl { get; set; }

    public required string Status { get; set; }

    public DateTimeOffset? RedeemedAt { get; set; }
    public DateTimeOffset? RevokedAt { get; set; }

    public DateTimeOffset CreatedAt { get; set; }
}