namespace DAL.Data.Entities;

public class Review : BaseEntity
{
    public int Rating { get; set; }

    public required string Content { get; set; }

    public Guid CourseId { get; set; }

    public Course Course { get; set; } = null!;

    public Guid ApplicationUserId { get; set; }

    public ApplicationUser ApplicationUser { get; set; } = null!;
}