using Application.Common.Interfaces;
using Application.Common.Interfaces.AppInterfaces;
using Domain.Enums;
using Domain.Events.LectureEvents;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.EventHandlers.LectureEventHandlers;

public class LectureCreatedEventHandler(
    IApplicationDbContext context,
    INotificationService notificationService
) : INotificationHandler<LectureCreatedEvent>
{
    public async Task Handle(LectureCreatedEvent notification, CancellationToken cancellationToken)
    {
        var lecture = notification.Lecture;

        var course = await context.Sections
            .Where(s => s.CourseId == lecture.SectionId)
            .Select(s => new { s.Course.Id, s.Course.Title })
            .FirstOrDefaultAsync(cancellationToken);

        if (course == null) return;

        var title = "Course Updated";
        var content = $"New lecture has been added in course \"{course.Title}\".";
        const NotificationType type = NotificationType.CourseUpdated;
        var url = $"/courses/{course.Id}";

        await foreach (var userId in context.Enrollments
                           .Where(e => e.CourseId == course.Id)
                           .Select(e => e.UserId)
                           .AsAsyncEnumerable()
                           .WithCancellation(cancellationToken))
            await notificationService.CreateAndSend(userId, title, content, type, RoleName.LEARNER, url);
    }
}