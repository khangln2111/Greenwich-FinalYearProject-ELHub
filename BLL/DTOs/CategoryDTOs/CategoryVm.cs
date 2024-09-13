namespace BLL.DTOs.CategoryDTOs;

public class CategoryVm
{
    public Guid Id { get; init; }
    public required string Name { get; init; }

    public string? Description { get; init; }
    public int CourseCount { get; init; }

    public DateTime CreatedAt { get; init; }

    public DateTime UpdatedAt { get; init; }
}