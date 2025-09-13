using Application.Common.Interfaces;
using Application.Common.Interfaces.AppInterfaces;
using Domain.Enums;
using Domain.Events.InstructorApplicationEvents;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.EventHandlers.InstructorApplicationEventHandlers;

public class InstructorApplicationModeratedEventHandler(
    INotificationService notificationService,
    IApplicationDbContext context)
    : INotificationHandler<InstructorApplicationModeratedEvent>
{
    public async Task Handle(InstructorApplicationModeratedEvent notification, CancellationToken cancellationToken)
    {
        var app = await context.InstructorApplications
            .AsNoTracking()
            .Where(a => a.Id == notification.InstructorApplication.Id)
            .Select(a => new { a.Id, a.UserId })
            .FirstOrDefaultAsync(cancellationToken);

        if (app is null) return;

        var (title, message, type) = notification.IsApproved
            ? ("Instructor Application Approved",
                "Congratulations! Your instructor application has been approved. You can now start creating courses.",
                NotificationType.InstructorApplicationApproved)
            : ("Instructor Application Rejected",
                "Your instructor application has been rejected. Please check the feedback for details.",
                NotificationType.InstructorApplicationRejected);


        await notificationService.CreateAndSend(
            app.UserId,
            title,
            message,
            type,
            RoleName.Instructor,
            "/become-instructor"
        );
    }
}