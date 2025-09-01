using Application.Common.Interfaces.AppInterfaces;
using Domain.Enums;
using Domain.Events.CourseEvents;
using MediatR;

namespace Application.EventHandlers.CourseEventHandlers;

public class CourseModeratedEventHandler(INotificationService notificationService)
    : INotificationHandler<CourseModeratedEvent>
{
    public async Task Handle(CourseModeratedEvent notification, CancellationToken cancellationToken)
    {
        var instructorId = notification.Course.InstructorId;

        var message = notification.IsApproved
            ? $"Your course \"{notification.Course.Title}\" has been approved and published."
            : $"Your course \"{notification.Course.Title}\" has been rejected. Please check feedback.";

        await notificationService.CreateAndSendAsync(
            instructorId,
            notification.IsApproved ? "Course approved" : "Course rejected",
            message,
            notification.IsApproved ? NotificationType.CourseApproved : NotificationType.CourseRejected,
            $"/instructor/courses/{notification.Course.Id}"
        );
    }
}