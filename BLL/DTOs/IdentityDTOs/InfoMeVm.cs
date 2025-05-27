using DAL.Data.Enums;

namespace BLL.DTOs.IdentityDTOs;

public class InfoMeVm
{
    public Guid Id { get; set; }
    public required string Email { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public Gender? Gender { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string[] Roles { get; set; } = [];
    public string? AvatarUrl { get; set; }
}