using Application.Common.Interfaces;
using Application.Common.Interfaces.AppInterfaces;
using Domain.Entities;
using Domain.Enums;
using Domain.Events.InstructorApplicationEvents;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.EventHandlers.InstructorApplicationEventHandlers;

public class InstructorApplicationResubmittedEventHandler(
    INotificationService notificationService,
    UserManager<ApplicationUser> userManager,
    IApplicationDbContext context)
    : INotificationHandler<InstructorApplicationResubmittedEvent>
{
    public async Task Handle(InstructorApplicationResubmittedEvent notification, CancellationToken cancellationToken)
    {
        var application = await context.InstructorApplications
            .AsNoTracking()
            .Where(a => a.Id == notification.InstructorApplication.Id)
            .Select(a => new
            {
                a.Id,
                a.UserId,
                a.FirstName,
                a.LastName
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (application == null) return;

        var admins = await userManager.GetUsersInRoleAsync(nameof(RoleName.Admin));

        foreach (var admin in admins)
            await notificationService.CreateAndSend(
                admin.Id,
                "Instructor Application Resubmitted",
                $"Instructor {application.FirstName} {application.LastName} has resubmitted their application.",
                NotificationType.CourseResubmitted,
                RoleName.Admin,
                $"/admin/instructor-applications/viewAppId={application.Id}"
            );
    }
}