namespace Application.DTOs.LectureDTOs;

public class LectureVm
{
    public Guid Id { get; set; }

    public required string Title { get; set; }
    public required string Description { get; set; }

    public required string VideoUrl { get; set; }

    public required bool IsPreview { get; set; }

    public int DurationInSeconds { get; set; }

    public Guid SectionId { get; set; }

    public int Order { get; set; }
}