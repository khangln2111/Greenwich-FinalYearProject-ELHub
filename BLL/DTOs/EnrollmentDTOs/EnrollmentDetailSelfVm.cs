using BLL.DTOs.SectionDTOs;

namespace BLL.DTOs.EnrollmentDTOs;

public class EnrollmentDetailSelfVm
{
    public Guid Id { get; init; }

    public required string Title { get; init; }

    public required string Description { get; init; }

    public int SectionCount { get; init; }

    public int LectureCount { get; init; }

    public EnrollmentSectionVm[] Sections { get; init; } = [];

    public required string ImageUrl { get; init; }

    public required string PromoVideoUrl { get; init; }

    public int DurationInSeconds { get; init; }

    public required string Status { get; init; }

    public required string Level { get; init; }

    public string[] LearningOutcomes { get; init; } = [];

    public string[] Prerequisites { get; init; } = [];

    public required string CategoryName { get; init; }

    public required string InstructorName { get; init; }

    public required string InstructorId { get; init; }

    public int ProgressPercentage { get; set; }

    public DateTime CreatedAt { get; init; }

    public DateTime UpdatedAt { get; init; }
}