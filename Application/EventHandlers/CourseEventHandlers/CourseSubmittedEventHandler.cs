using Application.Common.Interfaces.AppInterfaces;
using Domain.Constants;
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
        var admins = await userManager.GetUsersInRoleAsync(AppConstants.RoleNames.Instructor);
        var course = notification.Course;

        foreach (var admin in admins)
            await notificationService.CreateAndSendAsync(
                admin.Id,
                "New course submitted",
                $"Course \"{course.Title}\" has been submitted for review.",
                NotificationType.CourseSubmitted,
                $"/admin/courses/{course.Id}"
            );
    }
}