using Domain.Common;

namespace Domain.Entities;

public class Review : BaseAuditableEntity
{
    public int Rating { get; set; }
    public required string Content { get; set; }
    public Guid EnrollmentId { get; set; }
    public Enrollment Enrollment { get; set; } = null!;
    public ReviewReply? Reply { get; set; }
}