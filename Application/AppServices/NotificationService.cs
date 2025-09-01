using Application.Common.Interfaces;
using Application.Common.Interfaces.AppInterfaces;
using Application.Common.Interfaces.InfrastructureInterfaces;
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
    public async Task CreateAndSendAsync(
        Guid userId,
        string title,
        string content,
        NotificationType type,
        string? url = null)
    {
        var entity = new Notification
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            Title = title,
            Content = content,
            Type = type,
            Url = url,
            IsRead = false
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

    public async Task<Paged<NotificationVm>> GetList(GridifyQuery query)
    {
        return await context.Notifications
            .AsNoTracking()
            .GridifyToAsync<Notification, NotificationVm>(query, mapper, gridifyMapper);
    }

    public async Task MarkAsRead(Guid id)
    {
        var entity = await context.Notifications.FindAsync(id);
        if (entity == null) throw new KeyNotFoundException("Notification not found");

        entity.IsRead = true;
        await context.SaveChangesAsync();
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

    public async Task<int> GetUnreadCount()
    {
        var user = currentUserUtility.GetCurrentUser();
        if (user == null)
            throw new UnauthorizedException("User is not authenticated");

        return await context.Notifications
            .AsNoTracking()
            .CountAsync(n => n.UserId == user.Id && !n.IsRead);
    }
}