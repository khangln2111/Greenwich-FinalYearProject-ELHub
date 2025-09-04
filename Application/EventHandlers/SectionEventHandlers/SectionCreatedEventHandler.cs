using Application.Common.Interfaces;
using Application.Common.Interfaces.AppInterfaces;
using Domain.Enums;
using Domain.Events.SectionEvents;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.EventHandlers.SectionEventHandlers;

public class SectionCreatedEventHandler(
    IApplicationDbContext context,
    INotificationService notificationService
) : INotificationHandler<SectionCreatedEvent>
{
    public async Task Handle(SectionCreatedEvent notification, CancellationToken cancellationToken)
    {
        var course = await context.Courses
            .Where(c => c.Id == notification.Section.CourseId)
            .Select(c => new { c.Id, c.Title })
            .FirstOrDefaultAsync(cancellationToken);

        if (course == null) return;

        var title = "Course Updated";
        var content = $"New section has been added in course \"{course.Title}\".";
        var type = NotificationType.CourseUpdated;
        var url = $"/courses/{course.Id}";

        await foreach (var userId in context.Enrollments
                           .Where(e => e.CourseId == course.Id)
                           .Select(e => e.UserId)
                           .AsAsyncEnumerable()
                           .WithCancellation(cancellationToken))
            await notificationService.CreateAndSendAsync(userId, title, content, type, url);
    }
}