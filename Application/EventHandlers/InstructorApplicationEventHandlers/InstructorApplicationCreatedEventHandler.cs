using Application.Common.Interfaces;
using Application.Common.Interfaces.AppInterfaces;
using Domain.Entities;
using Domain.Enums;
using Domain.Events.InstructorApplicationEvents;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.EventHandlers.InstructorApplicationEventHandlers;

public class InstructorApplicationCreatedEventHandler(
    INotificationService notificationService,
    UserManager<ApplicationUser> userManager,
    IApplicationDbContext context)
    : INotificationHandler<InstructorApplicationCreatedEvent>
{
    public async Task Handle(InstructorApplicationCreatedEvent notification, CancellationToken cancellationToken)
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
                "New Instructor Application",
                $"A new instructor application has been submitted by {application.FirstName} {application.LastName}.",
                NotificationType.CourseSubmitted,
                RoleName.Admin,
                $"/admin/instructor-applications?viewAppId={application.Id}"
            );
    }
}