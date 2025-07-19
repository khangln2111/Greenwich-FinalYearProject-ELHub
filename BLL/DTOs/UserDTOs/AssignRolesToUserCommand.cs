namespace BLL.DTOs.UserDTOs;

public class AssignRolesToUserCommand
{
    public required string UserId { get; set; }
    public string[] RoleNames { get; set; } = [];
}