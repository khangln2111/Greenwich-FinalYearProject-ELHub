namespace Application.DTOs.ReviewDTOs;

public class UpdateReviewReplyCommand
{
    public Guid Id { get; set; }
    public required string Content { get; set; }
}