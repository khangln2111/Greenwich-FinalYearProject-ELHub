using Application.DTOs.ReviewDTOs;

namespace Application.DTOs.EnrollmentDTOs;

public class EnrollmentSelfVm
{
    public Guid Id { get; set; }
    public Guid CourseId { get; set; }
    public required string CourseTitle { get; set; }
    public required string CourseSummary { get; set; }
    public string? CourseImageUrl { get; set; }
    public string? InstructorName { get; set; }
    public string? InstructorAvatarUrl { get; set; }
    public int ProgressPercentage { get; set; }
    public ReviewVm? Review { get; set; }
}