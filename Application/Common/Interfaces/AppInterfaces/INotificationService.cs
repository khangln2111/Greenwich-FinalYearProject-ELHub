using Application.Common.Models;
using Application.DTOs.NotificationDTOs;
using Application.Gridify.CustomModels;
using Domain.Enums;
using Gridify;

namespace Application.Common.Interfaces.AppInterfaces;

public interface INotificationService
{
    Task CreateAndSendAsync(
        Guid userId,
        string title,
        string content,
        NotificationType type,
        RoleName targetRole,
        string? url = null
    );

    Task<Paged<NotificationVm>> GetListSelf(GridifyQuery query);

    Task<Paged<NotificationVm>> GetListSelf(GridifyQuery query, RoleName roleName);

    Task MarkAllAsRead();

    Task<Success> MarkAllAsRead(RoleName roleName);

    Task<Success> ToggleRead(Guid id);

    Task<int> GetUnreadCount();

    Task<int> GetUnreadCount(RoleName roleName);
}