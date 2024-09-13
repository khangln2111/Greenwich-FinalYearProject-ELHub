namespace DAL.Data.Entities;

public class CartItem : BaseEntity
{
    public int Quantity { get; set; }

    public Guid CartId { get; set; }
    public Cart Cart { get; set; } = null!;
    public Guid CourseId { get; set; }
    public Course Course { get; set; } = null!;
}