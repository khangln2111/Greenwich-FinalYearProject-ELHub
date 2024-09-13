using Microsoft.AspNetCore.Http;

namespace BLL.DTOs.CourseDTOs;

public class CreateCourseCommand
{
    public Guid CategoryId { get; init; }

    public required string Title { get; init; }
    public required string Summary { get; init; }
    public required string Description { get; init; }
    public required IFormFile Image { get; init; }

    public required IFormFile PromoVideo { get; init; }

    public decimal? Price { get; init; }

    public int? DiscountPercentage { get; init; }

    public string? Language { get; init; }

    public string? Level { get; init; }
}