using Microsoft.AspNetCore.Http;

namespace BLL.DTOs.CourseDTOs;

public class UpdateCourseCommand
{
    //properties for updating course
    public Guid Id { get; set; }


    public string? Title { get; set; }

    public string? Summary { get; set; }

    public string? Description { get; set; }

    public IFormFile? Image { get; set; }

    public IFormFile? PromoVideo { get; set; }

    public Guid? CategoryId { get; set; }

    public decimal? Price { get; set; }

    public int? DiscountPercentage { get; set; }

    public string? Language { get; set; }

    public string? Level { get; set; }
}