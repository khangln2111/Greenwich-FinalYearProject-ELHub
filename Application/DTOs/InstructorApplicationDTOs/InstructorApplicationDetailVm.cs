namespace Application.DTOs.InstructorApplicationDTOs;

public class InstructorApplicationDetailVm
{
    public Guid Id { get; set; }
    public required string Email { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string ProfessionalTitle { get; set; }
    public required string About { get; set; }
    public int RetryCount { get; set; }
    public string? AvatarUrl { get; set; }
    public required string Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? ReviewedAt { get; set; }
    public DateTime? LastRejectedAt { get; set; }
    public required string Note { get; set; }
}