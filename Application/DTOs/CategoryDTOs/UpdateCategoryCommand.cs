using Microsoft.AspNetCore.Http;

namespace Application.DTOs.CategoryDTOs;

public class UpdateCategoryCommand
{
    public Guid Id { get; set; }
    public string? Name { get; set; }

    public IFormFile? Image { get; set; }
}