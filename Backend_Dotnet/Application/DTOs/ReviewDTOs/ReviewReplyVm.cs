namespace Application.DTOs.ReviewDTOs;

public class ReviewReplyVm
{
    public Guid Id { get; set; }
    public string Content { get; set; } = null!;
    public string CreatorFullName { get; set; } = null!;
    public string? CreatorAvatarUrl { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
}