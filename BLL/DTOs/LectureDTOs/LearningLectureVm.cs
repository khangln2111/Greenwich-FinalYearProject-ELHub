namespace BLL.DTOs.LectureDTOs;

public class LearningLectureVm
{
    public Guid Id { get; set; }

    public required string Title { get; set; }
    public required string Description { get; set; }

    public required string VideoUrl { get; set; }

    public required bool Preview { get; set; }

    public int DurationInSeconds { get; set; }

    public Guid SectionId { get; set; }

    public int Order { get; set; }

    public bool Completed { get; set; }
}