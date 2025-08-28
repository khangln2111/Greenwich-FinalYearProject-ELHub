namespace Domain.Entities;

public class Notification : BaseEntity
{
    public required string Title { get; set; }
    public required string Content { get; set; }
    public bool IsRead { get; set; } = false;
    public string? Url { get; set; }
    public Guid UserId { get; set; }
    public ApplicationUser User { get; set; } = null!;
}