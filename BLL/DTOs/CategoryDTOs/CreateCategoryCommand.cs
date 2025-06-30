using Microsoft.AspNetCore.Http;

namespace BLL.DTOs.CategoryDTOs;

public class CreateCategoryCommand
{
    public required string Name { get; set; }

    public required IFormFile Image { get; set; }
}