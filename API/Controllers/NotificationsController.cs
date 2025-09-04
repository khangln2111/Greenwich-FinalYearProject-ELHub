using Application.Common.Interfaces.AppInterfaces;
using Application.DTOs.NotificationDTOs;
using Application.Gridify.CustomModels;
using Domain.Enums;
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
    public async Task<IActionResult> GetNotifications([FromQuery] GridifyQuery query, [FromQuery] RoleName roleName)
    {
        var notifications = await notificationService.GetListSelf(query, roleName);
        return Ok(notifications);
    }

    // PUT: api/notifications/mark-all-as-read
    [HttpPut("mark-all-as-read")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> MarkAllAsRead([FromBody] RoleName roleName)
    {
        var result = await notificationService.MarkAllAsRead(roleName);
        return Ok(result);
    }

    // PUT: api/notifications/{id}/mark-as-read
    [HttpPut("{id:guid}/toggle-read")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ToggleRead(Guid id)
    {
        var result = await notificationService.ToggleRead(id);
        return Ok(result);
    }

    // GET: api/notifications/unread-count
    [HttpGet("unread-count")]
    [ProducesResponseType<int>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetUnreadCount([FromQuery] RoleName roleName)
    {
        var count = await notificationService.GetUnreadCount(roleName);
        return Ok(count);
    }
}