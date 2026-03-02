using Domain.Common;

namespace Domain.Entities;

public class CartItem : BaseAuditableEntity
{
    public int Quantity { get; set; }

    public Guid CartId { get; set; }
    public Cart Cart { get; set; } = null!;
    public Guid CourseId { get; set; }
    public Course Course { get; set; } = null!;
}