namespace Application.DTOs.UserDTOs;

public class SetUserActivationCommand
{
    public required string UserId { get; set; }
    public bool IsActive { get; set; } = true;
}