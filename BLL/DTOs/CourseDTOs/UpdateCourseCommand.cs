using DAL.Data.Enums;
using Microsoft.AspNetCore.Http;

namespace BLL.DTOs.CourseDTOs;

public class UpdateCourseCommand
{
    public Guid Id { get; set; }

    public string? Title { get; set; }

    public string? Summary { get; set; }

    public string? Description { get; set; }

    public IFormFile? Image { get; set; }

    public IFormFile? PromoVideo { get; set; }

    public Guid? CategoryId { get; set; }

    public CourseLevel? Level { get; set; }

    public decimal? Price { get; set; }

    public decimal? DiscountedPrice { get; set; }

    public string[]? LearningOutcomes { get; set; }

    public string[]? Prerequisites { get; set; }
}