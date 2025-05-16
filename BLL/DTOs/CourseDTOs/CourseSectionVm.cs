namespace BLL.DTOs.CourseDTOs;

public class CourseSectionVm
{
    public Guid Id { get; init; }

    public required string Title { get; init; }

    public required string Description { get; init; }

    public int LectureCount { get; init; }

    public int DurationInSeconds { get; init; }

    public Guid CourseId { get; init; }

    public CourseLectureVm[]? Lectures { get; init; }

    public int Order { get; init; }
}