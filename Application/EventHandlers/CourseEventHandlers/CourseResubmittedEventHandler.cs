using Application.Common.Interfaces.AppInterfaces;
using Domain.Constants;
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

        var admins = await userManager.GetUsersInRoleAsync(AppConstants.RoleNames.Admin);

        foreach (var admin in admins)
            await notificationService.CreateAndSendAsync(
                admin.Id,
                "Course resubmitted",
                $"Course \"{course.Title}\" has been resubmitted for review.",
                NotificationType.CourseResubmitted,
                $"/admin/courses/{course.Id}"
            );
    }
}