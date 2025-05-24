namespace DAL.Data.Entities;

public class OrderItem : BaseEntity
{
    public int Quantity { get; set; }

    public decimal Price { get; set; }

    public Guid OrderId { get; set; }
    public Order Order { get; set; } = null!;

    public Guid CourseId { get; set; }
    public Course Course { get; set; } = null!;
}