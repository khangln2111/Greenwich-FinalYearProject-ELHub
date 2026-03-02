using Application.Common.Contracts.InfraContracts;
using Application.DTOs.NotificationDTOs;
using Hangfire;
using Infrastructure.SignalR;
using Microsoft.AspNetCore.SignalR;

namespace Infrastructure.Utilities;

public class NotificationUtility(IHubContext<NotificationHub> hubContext) : INotificationUtility
{
    public async Task SendNotification(Guid userId, NotificationVm vm)
    {
        await hubContext.Clients.User(userId.ToString()).SendAsync("ReceiveNotification", vm);
    }

    public Task SendNotificationInBackground(Guid userId, NotificationVm vm)
    {
        BackgroundJob.Enqueue(() => SendNotification(userId, vm));
        return Task.CompletedTask;
    }
}