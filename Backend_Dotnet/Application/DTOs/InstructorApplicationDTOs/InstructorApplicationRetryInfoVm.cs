namespace Application.DTOs.InstructorApplicationDTOs;

public class InstructorApplicationRetryInfoVm
{
    public bool CanRetry { get; set; }
    public int RetryRemaining { get; set; }
    public DateTimeOffset? RetryAvailableAt { get; set; }
}