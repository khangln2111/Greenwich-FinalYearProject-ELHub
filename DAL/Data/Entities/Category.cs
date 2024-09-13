namespace DAL.Data.Entities;

public class Category : BaseEntity
{
    public required string Name { get; set; }

    public string? Description { get; set; }

    public ICollection<Course> Courses { get; } = new List<Course>();
}