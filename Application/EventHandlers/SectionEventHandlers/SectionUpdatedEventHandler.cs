using Application.Common.Contracts;
using Application.Common.Contracts.AppContracts;
using Application.Common.Contracts.GeneralContracts;
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

        var userIds = await context.Enrollments
            .Where(e => e.CourseId == course.Id)
            .Select(e => e.UserId)
            .ToListAsync(cancellationToken);

        if (userIds.Count == 0) return;

        await notificationService.CreateAndSendBatch(
            userIds,
            title,
            content,
            type,
            RoleName.Learner,
            url,
            cancellationToken);
    }
}