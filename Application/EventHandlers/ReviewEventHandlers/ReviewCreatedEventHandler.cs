using Application.Common.Contracts.AppContracts;
using Application.Common.Contracts.GeneralContracts;
using Domain.Enums;
using Domain.Events.ReviewEvents;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.EventHandlers.ReviewEventHandlers;

public class ReviewCreatedEventHandler(
    IApplicationDbContext context,
    INotificationService notificationService
) : INotificationHandler<ReviewCreatedEvent>
{
    public async Task Handle(ReviewCreatedEvent notification, CancellationToken cancellationToken)
    {
        var review = await context.Reviews
            .Include(r => r.Enrollment)
            .ThenInclude(e => e.User)
            .FirstOrDefaultAsync(r => r.Id == notification.Review.Id, cancellationToken);

        if (review is null)
            return;

        var course = await context.Courses
            .AsNoTracking()
            .Include(c => c.Instructor)
            .FirstOrDefaultAsync(c => c.Id == review.Enrollment.CourseId, cancellationToken);

        if (course is null)
            return;

        var instructorId = course.InstructorId;
        var userName = review.Enrollment.User.UserName ?? "A learner";

        // Notify instructor
        await notificationService.CreateAndSend(
            instructorId,
            "New course review",
            $"{userName} rated your course \"{course.Title}\" {review.Rating} stars",
            NotificationType.ReviewCreated,
            RoleName.Learner,
            $"/instructor/courses/{course.Id}/edit?activeTab=Reviews"
        );
    }
}