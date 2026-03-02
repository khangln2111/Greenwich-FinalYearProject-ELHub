namespace Application.DTOs.InstructorApplicationDTOs;

public class ModerateInstructorApplicationCommand
{
    public Guid Id { get; init; }
    public bool IsApproved { get; init; }
    public required string Note { get; init; }
}