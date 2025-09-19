using Application.Common.Contracts.AppContracts;
using Domain.Enums;
using Domain.Events.CourseEvents;
using MediatR;

namespace Application.EventHandlers.CourseEventHandlers;

public class CourseBannedStatusSetEventHandler(INotificationService notificationService)
    : INotificationHandler<CourseBannedStatusSetEvent>
{
    public async Task Handle(CourseBannedStatusSetEvent notification, CancellationToken cancellationToken)
    {
        var course = notification.Course;
        var instructorId = course.InstructorId;

        var isBanned = course.Status == CourseStatus.Banned;

        var title = isBanned ? "Course banned" : "Course unbanned";

        var content = isBanned
            ? $"Your course \"{course.Title}\" has been banned. Please check the details."
            : $"Your course \"{course.Title}\" has been unbanned and republished.";

        await notificationService.CreateAndSend(
            instructorId,
            title,
            content,
            isBanned ? NotificationType.CourseBanned : NotificationType.CourseUnbanned,
            RoleName.Instructor,
            $"/instructor/courses/{course.Id}/edit"
        );
    }
}