using Application.DTOs.NotificationDTOs;

namespace Application.Common.Interfaces.InfrastructureInterfaces;

public interface INotificationUtility
{
    Task SendNotification(Guid userId, NotificationDto dto);

    Task SendNotificationInBackground(Guid userId, NotificationDto dto);
}