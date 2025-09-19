namespace Application.DTOs.CourseDTOs;

public class SetCourseBannedStatusCommand
{
    public Guid Id { get; set; }
    public bool IsBanned { get; set; }
    public string? BannedReason { get; set; }
}