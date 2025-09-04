using Application.Common.Interfaces;
using Application.Common.Interfaces.AppInterfaces;
using Domain.Enums;
using Domain.Events.SectionEvents;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.EventHandlers.SectionEventHandlers;

public class SectionUpdatedEventHandler(
    IApplicationDbContext context,
    INotificationService notificationService
) : INotificationHandler<SectionUpdatedEvent>
{
    public async Task Handle(SectionUpdatedEvent notification, CancellationToken cancellationToken)
    {
        var section = notification.Section;
        var course = await context.Courses
            .Where(c => c.Id == section.CourseId)
            .Select(c => new { c.Id, c.Title })
            .FirstOrDefaultAsync(cancellationToken);

        if (course == null) return;

        var title = "Course Updated";
        var content = $"A section has been updated in course \"{course.Title}\".";
        const NotificationType type = NotificationType.CourseUpdated;
        var url = $"/courses/{course.Id}";

        await foreach (var userId in context.Enrollments
                           .Where(e => e.CourseId == course.Id)
                           .Select(e => e.UserId)
                           .AsAsyncEnumerable()
                           .WithCancellation(cancellationToken))
            await notificationService.CreateAndSendAsync(userId, title, content, type, url);
    }
}