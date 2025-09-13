namespace Domain.Common;

public class BaseAuditableEntity : BaseEntity
{
    public DateTime CreatedAt { get; init; } = DateTime.Now;

    public DateTime UpdatedAt { get; set; } = DateTime.Now;
}