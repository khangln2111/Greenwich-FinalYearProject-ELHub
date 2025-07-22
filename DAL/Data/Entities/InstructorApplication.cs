using DAL.Data.Entities.MediaEntities;
using DAL.Data.Enums;

namespace DAL.Data.Entities;

public class InstructorApplication : BaseEntity
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

    public DateTime? ReviewedAt { get; set; }

    public DateTime? LastRejectedAt { get; set; }
}