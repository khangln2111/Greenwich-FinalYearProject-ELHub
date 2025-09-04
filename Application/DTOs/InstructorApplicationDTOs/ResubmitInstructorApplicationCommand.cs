using Microsoft.AspNetCore.Http;

namespace Application.DTOs.InstructorApplicationDTOs;

public class ResubmitInstructorApplicationCommand
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? ProfessionalTitle { get; set; }
    public string? About { get; set; }
    public IFormFile? Avatar { get; set; }
}