namespace Application.DTOs.OrderDTOs;

public class OrderItemVm
{
    public Guid Id { get; set; }
    public Guid CourseId { get; set; }

    public int Quantity { get; set; }

    public decimal Price { get; set; }

    public decimal DiscountedPrice { get; set; }

    public required string CourseTitle { get; set; }
    public required string CourseImageUrl { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public DateTimeOffset UpdatedAt { get; set; }
}