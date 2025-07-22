using Microsoft.AspNetCore.Http;

namespace BLL.DTOs.InstructorApplicationDTOs;

public class RetryInstructorApplicationCommand
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? ProfessionalTitle { get; set; }
    public string? About { get; set; }
    public IFormFile? Avatar { get; set; }
}