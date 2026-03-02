namespace Application.DTOs.GiftDTOs;

public class GiftVm
{
    public Guid Id { get; set; }

    public required string ReceiverEmail { get; set; }

    public required string GiverName { get; set; }

    public required string GiftName { get; set; }

    public string? GiftImageUrl { get; set; }

    public required string Status { get; set; }

    public DateTimeOffset? RedeemedAt { get; set; }

    public DateTimeOffset? RevokedAt { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public bool IsSentByCurrentUser { get; set; }
}