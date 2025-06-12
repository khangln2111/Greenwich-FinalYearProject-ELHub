namespace BLL.DTOs.ReviewDTOs;

public class ReviewVm
{
    public Guid Id { get; set; }
    public required string Content { get; set; }
    public int Rating { get; set; }
    public required string UserFullName { get; set; }
    public string? UserAvatarUrl { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}