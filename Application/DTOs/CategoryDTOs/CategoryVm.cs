namespace Application.DTOs.CategoryDTOs;

public class CategoryVm
{
    public Guid Id { get; init; }
    public required string Name { get; init; }

    public string? ImageUrl { get; init; }

    public int CourseCount { get; init; }

    public DateTimeOffset CreatedAt { get; init; }

    public DateTimeOffset UpdatedAt { get; init; }
}