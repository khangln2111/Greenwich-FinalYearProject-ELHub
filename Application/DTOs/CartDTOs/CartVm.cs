namespace Application.DTOs.CartDTOs;

public class CartVm
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public CartItemVm[] CartItems { get; set; } = [];
    public decimal ProvisionalAmount { get; set; }
    public decimal TotalAmount { get; set; }
    public decimal TotalDirectDiscount { get; set; }
}