using DAL.Data.Enums;

namespace DAL.Data.Entities;

public class Gift : BaseEntity
{
    public Guid GiverId { get; set; }

    public ApplicationUser Giver { get; set; } = null!;

    public required string ReceiverEmail { get; set; }

    public Guid CourseId { get; set; }

    public Course Course { get; set; } = null!;

    public GiftStatus Status { get; set; } = GiftStatus.Pending;

    public DateTime? RedeemedAt { get; set; }

    public DateTime? RevokedAt { get; set; }
}