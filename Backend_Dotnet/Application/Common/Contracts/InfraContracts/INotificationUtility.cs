using Application.Common.Contracts.GeneralContracts;
using Application.DTOs.NotificationDTOs;

namespace Application.Common.Contracts.InfraContracts;

public interface INotificationUtility : IInfraService
{
    Task SendNotification(Guid userId, NotificationVm vm);

    Task SendNotificationInBackground(Guid userId, NotificationVm vm);
}