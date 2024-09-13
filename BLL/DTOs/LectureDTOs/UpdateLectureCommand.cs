using Microsoft.AspNetCore.Http;

namespace BLL.DTOs.LectureDTOs;

public class UpdateLectureCommand
{
    public Guid Id { get; set; }

    public Guid? SectionId { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public IFormFile? Video { get; set; }
}