namespace Application.DTOs.CartDTOs;

public class CartItemVm
{
    public Guid Id { get; set; }
    public Guid CourseId { get; set; }
    public required string CourseTitle { get; set; }
    public required string CourseSummary { get; set; }
    public required string CourseImageUrl { get; set; }
    public decimal Price { get; set; }
    public decimal DiscountedPrice { get; set; }
    public int Quantity { get; set; }
    public decimal TotalPrice { get; set; }
}