using Application.Common.Interfaces.AppInterfaces;
using Domain.Entities;
using Domain.Enums;
using Domain.Events.CourseEvents;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.EventHandlers.CourseEventHandlers;

public class CourseSubmittedEventHandler(
    INotificationService notificationService,
    UserManager<ApplicationUser> userManager) : INotificationHandler<CourseSubmittedEvent>
{
    public async Task Handle(CourseSubmittedEvent notification, CancellationToken cancellationToken)
    {
        var admins = await userManager.GetUsersInRoleAsync(nameof(RoleName.Instructor));
        var course = notification.Course;

        foreach (var admin in admins)
            await notificationService.CreateAndSend(
                admin.Id,
                "New course submitted",
                $"Course \"{course.Title}\" has been submitted for moderation.",
                NotificationType.CourseSubmitted,
                RoleName.Admin,
                $"/admin/courses/{course.Id}"
            );
    }
}