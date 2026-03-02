namespace Application.DTOs.ReviewDTOs;

public class UpdateReviewCommand
{
    public Guid Id { get; set; }
    public int? Rating { get; set; }
    public string? Content { get; set; }
}