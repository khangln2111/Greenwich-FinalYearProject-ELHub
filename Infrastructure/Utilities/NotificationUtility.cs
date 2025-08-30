using Application.Common.Interfaces.InfrastructureInterfaces;
using Application.DTOs.NotificationDTOs;
using Hangfire;
using Infrastructure.SignalR;
using Microsoft.AspNetCore.SignalR;

namespace Infrastructure.Utilities;

public class NotificationUtility(IHubContext<NotificationHub> hubContext) : INotificationUtility
{
    public async Task SendNotification(Guid userId, NotificationDto dto)
    {
        await hubContext.Clients.User(userId.ToString()).SendAsync("ReceiveNotification", dto);
    }

    public Task SendNotificationInBackground(Guid userId, NotificationDto dto)
    {
        BackgroundJob.Enqueue(() => SendNotification(userId, dto));
        return Task.CompletedTask;
    }
}