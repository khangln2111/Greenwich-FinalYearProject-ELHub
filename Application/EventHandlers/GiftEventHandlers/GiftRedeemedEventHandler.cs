using Application.Common.Interfaces.AppInterfaces;
using Domain.Enums;
using Domain.Events.GiftEvents;
using MediatR;

namespace Application.EventHandlers.GiftEventHandlers;

public class GiftRedeemedEventHandler(
    INotificationService notificationService
) : INotificationHandler<GiftRedeemedEvent>
{
    public async Task Handle(GiftRedeemedEvent notification, CancellationToken cancellationToken)
    {
        var gift = notification.Gift;

        // Notify the giver that their gift has been redeemed
        await notificationService.CreateAndSend(
            gift.GiverId,
            "Your gift was redeemed",
            $"Your gift has just been redeemed by {gift.ReceiverEmail}. Thanks for sharing the joy!",
            NotificationType.GiftRedeemed,
            RoleName.Learner,
            "/account/sent-gifts"
        );
    }
}