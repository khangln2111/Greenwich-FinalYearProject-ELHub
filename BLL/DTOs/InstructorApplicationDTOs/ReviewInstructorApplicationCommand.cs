namespace BLL.DTOs.InstructorApplicationDTOs;

public class ReviewInstructorApplicationCommand
{
    public Guid Id { get; init; }
    public bool IsApproved { get; init; }
    public required string Note { get; init; }
}