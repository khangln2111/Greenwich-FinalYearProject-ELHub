namespace BLL.DTOs.CartDTOs;

public class UpdateCartItemCommand
{
    public Guid Id { get; set; }
    public int Quantity { get; set; }
}