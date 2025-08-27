using BLL.DTOs.SectionDTOs;

namespace BLL.DTOs.CourseDTOs;

public class CourseDetailVm
{
    public Guid Id { get; init; }

    public required string Title { get; init; }

    public required string Summary { get; init; }

    public required string Description { get; init; }

    public int SectionCount { get; init; }

    public int LectureCount { get; init; }

    public SectionVm[] Sections { get; init; } = [];

    public required string ImageUrl { get; init; }

    public required string PromoVideoUrl { get; init; }

    public required decimal Price { get; init; }

    public required int DiscountPercentage { get; init; }

    public required decimal DiscountedPrice { get; init; }

    public int DurationInSeconds { get; init; }

    public required string Status { get; init; }

    public required string Level { get; init; }

    public string[] LearningOutcomes { get; init; } = [];

    public string[] Prerequisites { get; init; } = [];

    public required string CategoryName { get; init; }

    public int ReviewCount { get; init; }

    public double AverageRating { get; init; }

    public int EnrollmentCount { get; init; }

    public required string InstructorId { get; init; }

    public string InstructorName { get; init; } = string.Empty;

    public string InstructorAvatarUrl { get; init; } = string.Empty;

    public string InstructorProfessionalTitle { get; init; } = string.Empty;

    public string InstructorAbout { get; init; } = string.Empty;

    public double InstructorAverageRating { get; init; }

    public int InstructorReviewCount { get; init; }

    public int InstructorCourseCount { get; init; }

    public int InstructorStudentCount { get; init; }

    public int RetryCount { get; init; }

    public CourseApprovalHistoryVm[] ApprovalHistories { get; init; } = [];

    public required CourseRatingDistributionVm RatingDistribution { get; set; }

    public DateTime? LastRejectedAt { get; init; }

    public DateTime? SubmittedAt { get; init; }

    public DateTime CreatedAt { get; init; }

    public DateTime UpdatedAt { get; init; }
}