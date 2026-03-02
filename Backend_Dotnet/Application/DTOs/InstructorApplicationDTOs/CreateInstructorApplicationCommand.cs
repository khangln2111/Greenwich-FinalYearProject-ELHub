using Microsoft.AspNetCore.Http;

namespace Application.DTOs.InstructorApplicationDTOs;

public class CreateInstructorApplicationCommand
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string ProfessionalTitle { get; set; }
    public required string About { get; set; }
    public required IFormFile Avatar { get; set; }
}