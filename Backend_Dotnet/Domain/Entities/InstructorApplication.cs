using Domain.Common;
using Domain.Entities.MediaEntities;
using Domain.Enums;

namespace Domain.Entities;

public class InstructorApplication : BaseAuditableEntity
{
    public Guid UserId { get; set; }

    public ApplicationUser User { get; set; } = null!;

    public required string FirstName { get; set; }

    public required string LastName { get; set; }

    public required string ProfessionalTitle { get; set; }

    public required string About { get; set; }

    public Media? Avatar { get; set; }

    public InstructorApplicationStatus Status { get; set; } = InstructorApplicationStatus.Pending;

    public string? Note { get; set; }

    public int RetryCount { get; set; } = 0;

    public DateTimeOffset? ReviewedAt { get; set; }

    public DateTimeOffset? LastRejectedAt { get; set; }
}