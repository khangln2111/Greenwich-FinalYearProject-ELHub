using Domain.Common;

namespace Domain.Entities;

public class InventoryItem : BaseAuditableEntity
{
    public Guid InventoryId { get; set; }

    public Inventory Inventory { get; set; } = null!;

    public Guid CourseId { get; set; }

    public Course Course { get; set; } = null!;

    public int Quantity { get; set; }
}