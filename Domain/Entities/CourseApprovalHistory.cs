using Domain.Common;

namespace Domain.Entities;

public class CourseApprovalHistory : BaseAuditableEntity
{
    public Guid CourseId { get; set; }
    public Course Course { get; set; } = null!;
    public bool IsApproved { get; set; }
    public required string Note { get; set; }
}