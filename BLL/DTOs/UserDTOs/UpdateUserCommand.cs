using Microsoft.AspNetCore.Http;

namespace BLL.DTOs.UserDTOs;

public class UpdateUserCommand
{
    public required Guid Id { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public IFormFile? Avatar { get; set; }

    public DateTime? DateOfBirth { get; set; }

    public string? DisplayName { get; set; }

    public string? ProfessionalTitle { get; set; }
}