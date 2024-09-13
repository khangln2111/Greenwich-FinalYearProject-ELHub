using DAL.Data.Entities.MediaEntities;

namespace DAL.Data.Entities;

public class Lecture : BaseEntity
{
    public required string Title { get; set; }
    public required string Description { get; set; }
    public DurationMedia? Video { get; set; }

    public Guid SectionId { get; set; }

    public Section Section { get; set; } = null!;

    // public ICollection<Quiz> Quizzes { get; } = new List<Quiz>();
}