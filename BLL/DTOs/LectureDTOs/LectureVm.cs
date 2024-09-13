namespace BLL.DTOs.LectureDTOs;

public class LectureVm
{
    public required string Title { get; set; }
    public required string Description { get; set; }

    public required string VideoUrl { get; set; }

    public int DurationInSeconds { get; set; }

    public Guid SectionId { get; set; }

    public required string SectionTitle { get; set; }
}