using Application.Common.Interfaces;
using Application.Common.Interfaces.AppInterfaces;
using Domain.Enums;
using Domain.Events.CourseEvents;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.EventHandlers.CourseEventHandlers;

public class CourseUpdatedEventHandler(
    IApplicationDbContext context,
    INotificationService notificationService
) : INotificationHandler<CourseUpdatedEvent>
{
    public async Task Handle(CourseUpdatedEvent notification, CancellationToken cancellationToken)
    {
        var course = notification.Course;

        var enrolledUsers = await context.Enrollments
            .Where(e => e.CourseId == course.Id)
            .Select(e => e.UserId)
            .ToListAsync(cancellationToken);

        if (!enrolledUsers.Any())
            return;

        var title = "Course Updated";
        var content = $"The course \"{course.Title}\" has been updated. Check out the latest changes!";
        var type = NotificationType.CourseUpdated;
        foreach (var userId in enrolledUsers)
            await notificationService.CreateAndSend(userId, title, content, type, RoleName.Learner,
                $"/courses/{course.Id}");
    }
}