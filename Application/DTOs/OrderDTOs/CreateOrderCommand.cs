namespace Application.DTOs.OrderDTOs;

public class CreateOrderCommand
{
    public required Guid[] CartItemIds { get; set; }
}