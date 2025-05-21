namespace BLL.DTOs.CartDTOs;

public class CreatePaymentIntentCommand
{
    public List<Guid> CartItemIds { get; set; } = [];
}