using BLL.DTOs.LectureDTOs;

namespace BLL.DTOs.SectionDTOs;

public class EnrollmentSectionVm
{
    public Guid Id { get; init; }

    public required string Title { get; init; }

    public required string Description { get; init; }

    public int LectureCount { get; init; }

    public int DurationInSeconds { get; init; }

    public Guid CourseId { get; init; }

    public EnrollmentLectureVm[] Lectures { get; init; } = [];

    public int Order { get; init; }
}