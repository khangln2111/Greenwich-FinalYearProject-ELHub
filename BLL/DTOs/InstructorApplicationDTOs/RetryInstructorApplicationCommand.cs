using Microsoft.AspNetCore.Http;

namespace BLL.DTOs.InstructorApplicationDTOs;

public class RetryInstructorApplicationCommand
{
    public string? DisplayName { get; set; }
    public string? ProfessionalTitle { get; set; }
    public string? About { get; set; }
    public IFormFile? WorkAvatar { get; set; }
}