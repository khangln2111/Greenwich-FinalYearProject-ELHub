namespace Application.DTOs.ReviewDTOs;

public class ReviewReplyVm
{
    public Guid Id { get; set; }
    public string Content { get; set; } = null!;
    public string CreatorFullName { get; set; } = null!;
    public string? CreatorAvatarUrl { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}