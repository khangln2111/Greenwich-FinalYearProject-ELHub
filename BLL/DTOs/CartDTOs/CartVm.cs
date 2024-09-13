namespace BLL.DTOs.CartDTOs;

public class CartVm
{
    public Guid Id { get; set; }
    public Guid ApplicationUserId { get; set; }
    public List<CartItemVm> CartItems { get; set; } = new();
    public decimal TotalPrice { get; set; }
}