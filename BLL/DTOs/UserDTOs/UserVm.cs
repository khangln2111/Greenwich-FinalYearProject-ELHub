using DAL.Data.Enums;

namespace BLL.DTOs.UserDTOs;

public class UserVm
{
    public Guid Id { get; set; }

    public required string Email { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? FullName { get; set; }

    public string? ProfessionalTitle { get; set; }

    public string? AvatarUrl { get; set; }

    public string[] Roles { get; set; } = [];

    public bool IsActivated { get; set; }

    public DateTime? DateOfBirth { get; set; }

    public string? Gender { get; set; }
}