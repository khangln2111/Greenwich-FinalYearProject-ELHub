namespace BLL.DTOs.CourseDTOs;

public class CourseVm
{
    //properties
    public Guid Id { get; init; }

    public required string Title { get; init; }

    public required string Description { get; init; }

    public int SectionCount { get; init; }

    public int LectureCount { get; init; }

    public string? ImageUrl { get; init; }

    public string? PromoVideoUrl { get; init; }

    public decimal Price { get; init; }

    public int DiscountPercentage { get; init; }

    public decimal DiscountedPrice { get; init; }

    public int DurationInSeconds { get; init; }

    public string? Status { get; init; }

    public string? Level { get; init; }

    public string[]? LearningOutcomes { get; init; }

    public string[]? Prerequisites { get; init; }

    public required string CategoryName { get; init; }

    public DateTime CreatedAt { get; init; }

    public DateTime UpdatedAt { get; init; }

    public required string InstructorId { get; init; }

    public required string InstructorName { get; init; }

    public string InstructorAvatarUrl { get; init; } = string.Empty;

    public string InstructorProfessionalTitle { get; init; } = string.Empty;

    public int ReviewCount { get; init; }

    public double AverageRating { get; init; }

    public int EnrollmentCount { get; init; }

    public int RejectionCount { get; init; }

    public DateTime? LastRejectedAt { get; init; }
}