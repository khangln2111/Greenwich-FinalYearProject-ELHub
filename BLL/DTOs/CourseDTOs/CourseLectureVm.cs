namespace BLL.DTOs.CourseDTOs;

public class CourseLectureVm
{
    public Guid Id { get; set; }

    public required string Title { get; set; }
    public required string Description { get; set; }

    public required string VideoUrl { get; set; }

    public required bool Preview { get; set; }

    public int DurationInSeconds { get; set; }

    public Guid SectionId { get; set; }

    public int Order { get; set; }
}