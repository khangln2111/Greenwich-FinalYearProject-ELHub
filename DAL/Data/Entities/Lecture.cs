using DAL.Data.Entities.MediaEntities;

namespace DAL.Data.Entities;

public class Lecture : BaseEntity
{
    public required string Title { get; set; }

    public string? Description { get; set; }

    public required bool Preview { get; set; } = false;

    public DurationMedia? Video { get; set; }

    public Guid SectionId { get; set; }

    public Section Section { get; set; } = null!;

    public int Order { get; set; }

    // public ICollection<Quiz> Quizzes { get; } = new List<Quiz>();
}