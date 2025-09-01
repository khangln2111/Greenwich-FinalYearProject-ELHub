using Domain.Common;

namespace Domain.Entities;

public class Section : BaseAuditableEntity
{
    public required string Title { get; set; }

    public string? Description { get; set; }

    public Guid CourseId { get; set; }

    public Course Course { get; set; } = null!;

    public int Order { get; set; }

    public ICollection<Lecture> Lectures { get; } = new List<Lecture>();

    // Denormalized properties for performance optimization
    public int LectureCount { get; set; }

    public int DurationInSeconds { get; set; }
}