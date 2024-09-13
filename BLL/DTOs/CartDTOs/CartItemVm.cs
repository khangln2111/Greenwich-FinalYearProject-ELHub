namespace BLL.DTOs.CartDTOs;

public class CartItemVm
{
    public Guid Id { get; set; }
    public Guid CourseId { get; set; }
    public required string CourseTitle { get; set; }
    public required string CourseDescription { get; set; }
    public required string CourseImageUrl { get; set; }
    public decimal CoursePrice { get; set; }
    public int Quantity { get; set; }
    public decimal TotalPrice { get; set; }
}