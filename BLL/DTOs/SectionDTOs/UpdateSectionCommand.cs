namespace BLL.DTOs.SectionDTOs;

public class UpdateSectionCommand
{
    public Guid Id { get; set; }

    public string? Title { get; set; }

    public required string? Description { get; set; }
}