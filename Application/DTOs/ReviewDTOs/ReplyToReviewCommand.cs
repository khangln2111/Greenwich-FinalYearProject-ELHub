namespace Application.DTOs.ReviewDTOs;

public class ReplyToReviewCommand
{
    public Guid Id { get; set; }

    public required string Content { get; set; }
}