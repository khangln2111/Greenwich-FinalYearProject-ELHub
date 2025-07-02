using Microsoft.AspNetCore.Http;

namespace BLL.DTOs.InstructorApplicationDTOs;

public class CreateInstructorApplicationCommand
{
    public required string DisplayName { get; set; }
    public required string ProfessionalTitle { get; set; }
    public required string About { get; set; }

    public required IFormFile WorkAvatar { get; set; }
}