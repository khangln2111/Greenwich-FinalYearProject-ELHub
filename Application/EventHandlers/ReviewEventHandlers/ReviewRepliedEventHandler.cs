using Application.Common.Interfaces;
using Application.Common.Interfaces.AppInterfaces;
using Domain.Enums;
using Domain.Events.ReviewEvents;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.EventHandlers.ReviewEventHandlers;

public class ReviewRepliedEventHandler(
    IApplicationDbContext context,
    INotificationService notificationService
) : INotificationHandler<ReviewRepliedEvent>
{
    public async Task Handle(ReviewRepliedEvent notification, CancellationToken cancellationToken)
    {
        var review = await context.Reviews
            .Include(r => r.Enrollment)
            .ThenInclude(e => e.Course)
            .FirstOrDefaultAsync(r => r.Id == notification.Review.Id, cancellationToken);

        if (review?.Reply is null) return;

        await notificationService.CreateAndSend(
            review.Enrollment.UserId,
            "Instructor replied to your review",
            $"Your review for \"{review.Enrollment.Course.Title}\" has a new reply: \"{review.Reply.Content}\"",
            NotificationType.ReviewReplied,
            RoleName.Learner,
            $"/account/reviews/{review.Id}"
        );
    }
}