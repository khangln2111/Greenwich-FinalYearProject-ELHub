namespace BLL.DTOs.OrderDTOs;

public class CreatePaymentIntentCommand
{
    public required Guid[] CartItemIds { get; set; }
}