using Application.Common.Interfaces.AppInterfaces;
using Domain.Enums;
using Domain.Events.OrderEvents;
using MediatR;

namespace Application.EventHandlers.OrderEventHandlers;

public class OrderProcessedEventHandler(
    INotificationService notificationService
) : INotificationHandler<OrderProcessedEvent>
{
    public async Task Handle(OrderProcessedEvent notification, CancellationToken cancellationToken)
    {
        var order = notification.Order;

        await notificationService.CreateAndSend(
            order.UserId,
            "Order Processed",
            $"Your order with ID {order.Id} has been processed",
            NotificationType.OrderProcessed,
            RoleName.LEARNER,
            $"/dashboard/order-history/{order.Id}"
        );
    }
}