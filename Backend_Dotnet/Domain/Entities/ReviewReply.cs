using Domain.Common;

namespace Domain.Entities;

public class ReviewReply : BaseAuditableEntity
{
    public Guid ReviewId { get; set; }
    public Review Review { get; set; } = null!;
    public required string Content { get; set; }

    public Guid CreatorId { get; set; }
    public ApplicationUser Creator { get; set; } = null!;
}