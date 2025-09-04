using Application.Common.Interfaces.AppInterfaces;
using Application.DTOs.NotificationDTOs;
using Application.Gridify.CustomModels;
using Gridify;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class NotificationsController(INotificationService notificationService) : ControllerBase
{
    // GET: api/notifications/self
    [HttpGet("self")]
    [ProducesResponseType<Paged<NotificationVm>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetNotifications([FromQuery] GridifyQuery query)
    {
        var notifications = await notificationService.GetListSelf(query);
        return Ok(notifications);
    }

    // PUT: api/notifications/mark-all-as-read
    [HttpPut("mark-all-as-read")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> MarkAllAsRead()
    {
        await notificationService.MarkAllAsRead();
        return Ok();
    }


    // PUT: api/notifications/{id}/mark-as-read
    [HttpPut("{id:guid}/mark-as-read")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> MarkAsRead(Guid id)
    {
        await notificationService.ToggleRead(id);
        return Ok();
    }

    // GET: api/notifications/unread-count
    [HttpGet("unread-count")]
    [ProducesResponseType<int>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetUnreadCount()
    {
        var count = await notificationService.GetUnreadCount();
        return Ok(count);
    }
}