using Application.Common.Interfaces.AppInterfaces;
using Domain.Entities;
using Domain.Enums;
using Domain.Events.CourseEvents;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.EventHandlers.CourseEventHandlers;

public class CourseResubmittedEventHandler(
    INotificationService notificationService,
    UserManager<ApplicationUser> userManager)
    : INotificationHandler<CourseResubmittedEvent>
{
    public async Task Handle(CourseResubmittedEvent notification, CancellationToken cancellationToken)
    {
        var course = notification.Course;

        var admins = await userManager.GetUsersInRoleAsync(nameof(RoleName.Admin));

        foreach (var admin in admins)
            await notificationService.CreateAndSend(
                admin.Id,
                "Course resubmitted",
                $"Course \"{course.Title}\" has been resubmitted for moderation.",
                NotificationType.CourseResubmitted,
                RoleName.Admin,
                $"/admin/courses/{course.Id}"
            );
    }
}