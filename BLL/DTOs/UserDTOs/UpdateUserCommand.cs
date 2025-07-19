using Microsoft.AspNetCore.Http;

namespace BLL.DTOs.UserDTOs;

public class UpdateUserCommand
{
    public required Guid Id { get; set; }

    public string? FullName { get; set; }

    public required string Email { get; set; }

    public IFormFile? Avatar { get; set; }

    public DateTime? DateOfBirth { get; set; }
}