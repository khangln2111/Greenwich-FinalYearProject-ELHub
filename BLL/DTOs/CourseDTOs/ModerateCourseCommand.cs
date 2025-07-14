namespace BLL.DTOs.CourseDTOs;

public class ModerateCourseCommand
{
    public Guid Id { get; set; }

    public bool IsApproved { get; set; }

    public required string Note { get; set; }
}