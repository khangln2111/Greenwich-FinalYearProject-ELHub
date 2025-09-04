using Application.Common.Interfaces;
using Application.Common.Interfaces.AppInterfaces;
using Application.Common.Interfaces.InfrastructureInterfaces;
using Domain.Entities;
using Domain.Enums;
using Domain.Events.GiftEvents;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.EventHandlers.GiftEventHandlers;

public class GiftCreatedEventHandler(
    IApplicationDbContext context,
    INotificationService notificationService,
    IEmailUtility emailUtility,
    UserManager<ApplicationUser> userManager
) : INotificationHandler<GiftCreatedEvent>
{
    public async Task Handle(GiftCreatedEvent notification, CancellationToken cancellationToken)
    {
        var gift = await context.Gifts
            .Include(g => g.InventoryItem).ThenInclude(ii => ii.Course)
            .Include(g => g.InventoryItem).ThenInclude(ii => ii.Inventory).ThenInclude(inv => inv.User)
            .FirstOrDefaultAsync(g => g.Id == notification.Gift.Id, cancellationToken);

        if (gift == null) return;

        var giver = gift.InventoryItem.Inventory.User;
        var course = gift.InventoryItem.Course;
        var receiverEmail = gift.ReceiverEmail;
        if (string.IsNullOrWhiteSpace(receiverEmail)) return;

        var giftCode = gift.Id.ToString().ToUpperInvariant();
        var giverFullName = $"{giver.FirstName} {giver.LastName}".Trim();
        var courseTitle = course.Title;

        // Send gift email to receiver
        await emailUtility.SendGiftEmail(
            receiverEmail,
            giftCode,
            giver?.Email ?? "noreply@example.com",
            giverFullName,
            courseTitle
        );

        // If receiver is not registered, skip in-app notification
        var receiver = await userManager.FindByEmailAsync(receiverEmail);
        if (receiver == null) return;

        // Send in-app notification to receiver
        await notificationService.CreateAndSendAsync(
            receiver.Id,
            "You’ve received a gift!",
            $"{giverFullName} sent you a gift. Please check your email ({receiverEmail}) for details.",
            NotificationType.ReceivedGift,
            RoleName.LEARNER,
            "/dashboard/gifts?type=received"
        );
    }
}