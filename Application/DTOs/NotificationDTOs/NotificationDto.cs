using Domain.Enums;

namespace Application.DTOs.NotificationDTOs;

public class NotificationDto
{
    public Guid Id { get; set; }
    public required string Title { get; set; }
    public required string Content { get; set; }
    public bool IsRead { get; set; }
    public required NotificationType Type { get; set; }
    public string? Url { get; set; }
    public DateTime CreatedAt { get; set; }
}