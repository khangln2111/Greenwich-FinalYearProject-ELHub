using DAL.Data.Enums;
using Microsoft.AspNetCore.Http;

namespace BLL.DTOs.CourseDTOs;

public class CreateCourseCommand
{
    public Guid CategoryId { get; init; }
    public required string Title { get; init; }
    public required string Description { get; init; }
    public required IFormFile Image { get; init; }
    public required IFormFile PromoVideo { get; init; }
    public decimal Price { get; init; }
    public decimal DiscountedPrice { get; init; }
    public CourseLevel Level { get; init; }
}