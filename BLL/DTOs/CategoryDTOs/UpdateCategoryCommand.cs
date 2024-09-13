namespace BLL.DTOs.CategoryDTOs;

public class UpdateCategoryCommand
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
}