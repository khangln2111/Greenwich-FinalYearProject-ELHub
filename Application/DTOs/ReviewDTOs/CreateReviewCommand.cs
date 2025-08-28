namespace Application.DTOs.ReviewDTOs;

public class CreateReviewCommand
{
    public Guid CourseId { get; set; }
    public int Rating { get; set; }
    public required string Content { get; set; }
}