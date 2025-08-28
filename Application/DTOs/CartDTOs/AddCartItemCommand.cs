namespace Application.DTOs.CartDTOs;

public class AddCartItemCommand
{
    public Guid CourseId { get; set; }
    public int Quantity { get; set; }
}