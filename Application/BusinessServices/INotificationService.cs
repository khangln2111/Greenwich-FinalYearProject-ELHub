using Domain.Enums;

namespace Application.BusinessServices;

public interface INotificationService
{
    Task CreateAndSendAsync(Guid userId, string title, string content, NotificationType type, string? url = null);
}