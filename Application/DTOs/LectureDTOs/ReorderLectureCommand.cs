namespace Application.DTOs.LectureDTOs;

public class ReorderLectureCommand
{
    public Guid Id { get; set; }
    public int NewOrder { get; set; }
    public Guid NewSectionId { get; set; }
}