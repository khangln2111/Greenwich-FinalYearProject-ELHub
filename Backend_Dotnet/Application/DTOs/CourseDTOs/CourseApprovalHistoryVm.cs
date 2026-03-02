namespace Application.DTOs.CourseDTOs;

public class CourseApprovalHistoryVm
{
    public Guid Id { get; init; }

    public Guid CourseId { get; set; }
    public bool IsApproved { get; set; }
    public required string Note { get; set; }
    public DateTimeOffset CreatedAt { get; init; }
    public DateTimeOffset UpdatedAt { get; init; }
}