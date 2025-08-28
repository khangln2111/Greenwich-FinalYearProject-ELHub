namespace Application.DTOs.SectionDTOs;

public class CreateSectionCommand
{
    public Guid CourseId { get; set; }

    public required string Title { get; set; }

    public required string Description { get; set; }
}