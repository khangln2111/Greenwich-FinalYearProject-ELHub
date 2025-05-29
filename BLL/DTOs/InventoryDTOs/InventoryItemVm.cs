namespace BLL.DTOs.InventoryDTOs;

public class InventoryItemVm
{
    public Guid Id { get; set; }
    public Guid CourseId { get; set; }
    public required string CourseTitle { get; set; }
    public required string CourseDescription { get; set; }
    public string? CourseImageUrl { get; set; }
    public int Quantity { get; set; }
    public bool Enrolled { get; set; }
}