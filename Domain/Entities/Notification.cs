using Domain.Common;
using Domain.Enums;

namespace Domain.Entities;

public class Notification : BaseAuditableEntity
{
    public required string Title { get; set; }
    public required string Content { get; set; }
    public bool IsRead { get; set; } = false;
    public required NotificationType Type { get; set; }
    public string? Url { get; set; }
    public Guid UserId { get; set; }
    public ApplicationUser User { get; set; } = null!;
    public required RoleName TargetRole { get; set; }

    public void ToggleRead()
    {
        IsRead = !IsRead;
    }
}