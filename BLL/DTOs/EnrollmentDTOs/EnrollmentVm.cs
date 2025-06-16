using BLL.DTOs.ReviewDTOs;
using Stripe;

namespace BLL.DTOs.EnrollmentDTOs;

public class EnrollmentVm
{
    public Guid Id { get; set; }
    public Guid CourseId { get; set; }
    public required string CourseTitle { get; set; }
    public required string CourseDescription { get; set; }
    public string? CourseImageUrl { get; set; }
    public int ProgressPercentage { get; set; }
    public ReviewVm? Review { get; set; }
}