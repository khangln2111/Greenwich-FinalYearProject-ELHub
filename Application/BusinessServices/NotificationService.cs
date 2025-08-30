using Application.Common.Interfaces;
using Application.Common.Interfaces.InfrastructureInterfaces;
using Application.DTOs.NotificationDTOs;
using Domain.Entities;
using Domain.Enums;
using Microsoft.AspNetCore.SignalR;

namespace Application.BusinessServices;

public class NotificationService(IApplicationDbContext context, INotificationUtility notificationUtility)
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

        var dto = new NotificationDto
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
}