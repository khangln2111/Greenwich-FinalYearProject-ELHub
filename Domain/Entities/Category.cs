using Domain.Entities.MediaEntities;

namespace Domain.Entities;

public class Category : BaseEntity
{
    public required string Name { get; set; }

    public Media? Image { get; set; }

    public ICollection<Course> Courses { get; } = new List<Course>();
}