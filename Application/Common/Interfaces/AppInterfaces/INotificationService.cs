using Application.DTOs.NotificationDTOs;
using Application.Gridify.CustomModels;
using Domain.Enums;
using Gridify;

namespace Application.Common.Interfaces.AppInterfaces;

public interface INotificationService
{
    Task CreateAndSendAsync(Guid userId, string title, string content, NotificationType type, string? url = null);

    Task<Paged<NotificationVm>> GetList(GridifyQuery query);

    Task MarkAllAsRead();

    Task MarkAsRead(Guid id);

    Task<int> GetUnreadCount();
}