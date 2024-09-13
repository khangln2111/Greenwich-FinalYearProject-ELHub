using Microsoft.AspNetCore.Http;

namespace BLL.DTOs.LectureDTOs;

public class CreateLectureCommand
{
    public Guid SectionId { get; set; }

    public required string Title { get; set; }

    public required string Description { get; set; }

    public required IFormFile Video { get; set; }
}