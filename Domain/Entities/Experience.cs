namespace Domain.Entities;

public class Experience : BaseEntity
{
    public Guid UserId { get; set; }
    public ApplicationUser User { get; set; } = null!;
    public string OrganizationName { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; } // null = now or ongoing
}