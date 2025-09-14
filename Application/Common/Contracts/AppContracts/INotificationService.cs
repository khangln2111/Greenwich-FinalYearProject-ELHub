using Application.Common.Contracts.GeneralContracts;
using Application.Common.Models;
using Application.DTOs.NotificationDTOs;
using Application.Gridify.CustomModels;
using Domain.Enums;
using Gridify;

namespace Application.Common.Contracts.AppContracts;

public interface INotificationService : IAppService
{
    Task CreateAndSend(
        Guid userId,
        string title,
        string content,
        NotificationType type,
        RoleName targetRole,
        string? url = null
    );

    Task CreateAndSendBatch(
        IEnumerable<Guid> userIds,
        string title,
        string content,
        NotificationType type,
        RoleName targetRole,
        string? url = null,
        CancellationToken cancellationToken = default
    );

    Task<Paged<NotificationVm>> GetListSelf(GridifyQuery query);

    Task<Paged<NotificationVm>> GetListSelf(GridifyQuery query, RoleName roleName);

    Task MarkAllAsRead();

    Task<Success> MarkAllAsRead(RoleName roleName);

    Task<Success> ToggleRead(Guid id);

    Task<int> GetUnreadCount();

    Task<int> GetUnreadCount(RoleName roleName);
}