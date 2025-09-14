using Application.Common.Contracts;
using Application.Common.Contracts.AppContracts;
using Application.Common.Contracts.GeneralContracts;
using Application.Common.Contracts.InfraContracts;
using Application.Common.Models;
using Application.DTOs.NotificationDTOs;
using Application.Exceptions;
using Application.Gridify;
using Application.Gridify.CustomModels;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Gridify;
using Microsoft.EntityFrameworkCore;

namespace Application.AppServices;

public class NotificationService(
    IApplicationDbContext context,
    INotificationUtility notificationUtility,
    IGridifyMapper<Notification> gridifyMapper,
    IMapper mapper,
    ICurrentUserUtility currentUserUtility)
    : INotificationService
{
    public async Task CreateAndSend(
        Guid userId,
        string title,
        string content,
        NotificationType type,
        RoleName targetRole,
        string? url = null
    )
    {
        var entity = new Notification
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            Title = title,
            Content = content,
            Type = type,
            Url = url,
            IsRead = false,
            TargetRole = targetRole
        };

        await context.Notifications.AddAsync(entity);
        await context.SaveChangesAsync();

        var dto = new NotificationVm
        {
            Id = entity.Id,
            Title = entity.Title,
            Content = entity.Content,
            Type = entity.Type,
            Url = entity.Url,
            IsRead = entity.IsRead,
            CreatedAt = entity.CreatedAt
        };

        await notificationUtility.SendNotificationInBackground(userId, dto);
    }

    public async Task CreateAndSendBatch(
        IEnumerable<Guid> userIds,
        string title,
        string content,
        NotificationType type,
        RoleName targetRole,
        string? url = null,
        CancellationToken cancellationToken = default
    )
    {
        var notifications = userIds.Select(userId => new Notification
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            Title = title,
            Content = content,
            Type = type,
            Url = url,
            IsRead = false,
            TargetRole = targetRole
        }).ToList();

        await context.Notifications.AddRangeAsync(notifications, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        var dtos = notifications.Select(entity => new NotificationVm
        {
            Id = entity.Id,
            Title = entity.Title,
            Content = entity.Content,
            Type = entity.Type,
            Url = entity.Url,
            IsRead = entity.IsRead,
            CreatedAt = entity.CreatedAt
        }).ToList();

        var sendTasks = notifications.Zip(dtos, (entity, dto) =>
            notificationUtility.SendNotificationInBackground(entity.UserId, dto));

        await Task.WhenAll(sendTasks);
    }


    public async Task<Paged<NotificationVm>> GetListSelf(GridifyQuery query)
    {
        var user = currentUserUtility.GetCurrentUser();
        if (user == null)
            throw new UnauthorizedException("User is not authenticated");
        return await context.Notifications
            .AsNoTracking()
            .Where(n => n.UserId == user.Id)
            .GridifyToAsync<Notification, NotificationVm>(query, mapper, gridifyMapper);
    }


    public async Task<Paged<NotificationVm>> GetListSelf(GridifyQuery query, RoleName roleName)
    {
        var user = currentUserUtility.GetCurrentUser();
        if (user is null)
            throw new UnauthorizedException("User is not authenticated");

        // Safety check, if role is not found, return empty list
        if (!RoleNotificationMap.TryGetValue(roleName, out var allowedTypes))
            return new Paged<NotificationVm>(0, new List<NotificationVm>());

        return await context.Notifications
            .AsNoTracking()
            .Where(n => n.UserId == user.Id && allowedTypes.Contains(n.Type))
            .GridifyToAsync<Notification, NotificationVm>(query, mapper, gridifyMapper);
    }

    public async Task MarkAllAsRead()
    {
        var user = currentUserUtility.GetCurrentUser();
        if (user == null)
            throw new UnauthorizedException("User is not authenticated");

        await context.Notifications
            .Where(n => n.UserId == user.Id && !n.IsRead)
            .ExecuteUpdateAsync(setters => setters
                .SetProperty(n => n.IsRead, true)
            );

        await context.SaveChangesAsync();
    }

    public async Task<Success> MarkAllAsRead(RoleName roleName)
    {
        var user = currentUserUtility.GetCurrentUser();
        if (user is null)
            throw new UnauthorizedException("User is not authenticated");

        // Safety check, if role is not found, return success without doing anything
        if (!RoleNotificationMap.TryGetValue(roleName, out var allowedTypes))
            return new Success("No notifications to mark as read");

        await context.Notifications
            .Where(n => n.UserId == user.Id && !n.IsRead && allowedTypes.Contains(n.Type))
            .ExecuteUpdateAsync(setters => setters
                .SetProperty(n => n.IsRead, true)
            );

        await context.SaveChangesAsync();

        return new Success("All notifications marked as read successfully");
    }

    public async Task<Success> ToggleRead(Guid id)
    {
        var user = currentUserUtility.GetCurrentUser();
        if (user == null)
            throw new UnauthorizedException("User is not authenticated");

        await context.Notifications
            .Where(n => n.Id == id && n.UserId == user.Id)
            .ExecuteUpdateAsync(s => s.SetProperty(
                n => n.IsRead,
                n => !n.IsRead
            ));

        return new Success("Notification read status toggled successfully");
    }

    public async Task<int> GetUnreadCount()
    {
        var user = currentUserUtility.GetCurrentUser();
        if (user == null)
            throw new UnauthorizedException("User is not authenticated");

        return await context.Notifications
            .AsNoTracking()
            .CountAsync(n => n.UserId == user.Id && !n.IsRead);
    }

    public async Task<int> GetUnreadCount(RoleName roleName)
    {
        var user = currentUserUtility.GetCurrentUser();
        if (user == null)
            throw new UnauthorizedException("User is not authenticated");

        if (!RoleNotificationMap.TryGetValue(roleName, out var allowedTypes))
            return 0;

        return await context.Notifications
            .AsNoTracking()
            .CountAsync(n =>
                n.UserId == user.Id &&
                !n.IsRead &&
                allowedTypes.Contains(n.Type));
    }

    private static readonly Dictionary<RoleName, NotificationType[]> RoleNotificationMap = new()
    {
        {
            RoleName.Learner, [
                NotificationType.CourseUpdated,
                NotificationType.GiftRedeemed,
                NotificationType.ReceivedGift,
                NotificationType.ReviewCreated,
                NotificationType.ReviewReplied,
                NotificationType.OrderProcessed,
                NotificationType.InstructorApplicationApproved,
                NotificationType.InstructorApplicationRejected
            ]
        },
        {
            RoleName.Admin, [
                NotificationType.CourseSubmitted,
                NotificationType.CourseResubmitted,
                NotificationType.InstructorApplicationSubmitted,
                NotificationType.InstructorApplicationResubmitted
            ]
        },
        {
            RoleName.Instructor, [
                NotificationType.ReviewCreated,
                NotificationType.CourseApproved,
                NotificationType.CourseRejected
            ]
        }
    };
}