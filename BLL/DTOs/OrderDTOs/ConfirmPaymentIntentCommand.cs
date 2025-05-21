namespace BLL.DTOs.OrderDTOs;

public class ConfirmPaymentIntentCommand
{
    public required string PaymentIntentId { get; init; }
}