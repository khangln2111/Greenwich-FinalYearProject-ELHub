using Application.DTOs.NotificationDTOs;

namespace Application.Common.Interfaces.InfrastructureInterfaces;

public interface INotificationUtility
{
    Task SendNotification(Guid userId, NotificationVm vm);

    Task SendNotificationInBackground(Guid userId, NotificationVm vm);
}