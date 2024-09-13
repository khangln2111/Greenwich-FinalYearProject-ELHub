namespace BLL.DTOs.SectionDTOs;

public class SectionVm
{
    public Guid Id { get; set; }

    public required string Title { get; set; }

    public required string Description { get; set; }

    public int LectureCount { get; set; }

    public int DurationInSeconds { get; set; }

    public Guid CourseId { get; set; }
}