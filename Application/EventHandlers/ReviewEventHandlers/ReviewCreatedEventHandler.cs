using Application.Common.Interfaces;
using Application.Common.Interfaces.AppInterfaces;
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
        var review = notification.Review;

        var course = await context.Courses
            .AsNoTracking()
            .Include(c => c.Instructor)
            .FirstOrDefaultAsync(c => c.Id == review.Enrollment.CourseId, cancellationToken);

        if (course is null) return;

        var instructorId = course.InstructorId;

        // Notify instructor
        await notificationService.CreateAndSendAsync(
            instructorId,
            "New course review",
            $"{review.Enrollment.User.UserName} rated your course \"{course.Title}\" {review.Rating} stars: \"{review.Content}\"",
            NotificationType.ReviewCreated,
            $"/instructor/courses/{course.Id}/edit?activeTab=Reviews"
        );
    }
}