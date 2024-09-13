namespace DAL.Data.Entities;

public class Section : BaseEntity
{
    public required string Title { get; set; }

    public required string Description { get; set; }

    public Guid CourseId { get; set; }

    public Course Course { get; set; } = null!;

    public ICollection<Lecture> Lectures { get; } = new List<Lecture>();
}