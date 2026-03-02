using Domain.Common;
using Domain.Entities.MediaEntities;

namespace Domain.Entities;

public class Lecture : BaseAuditableEntity
{
    public required string Title { get; set; }

    public string? Description { get; set; }

    public required bool IsPreview { get; set; } = false;

    public Guid? VideoId { get; set; }

    public DurationMedia? Video { get; set; }

    public Guid SectionId { get; set; }

    public Section Section { get; set; } = null!;

    public int Order { get; set; }

    public ICollection<LectureProgress> LectureProgresses { get; set; } = new List<LectureProgress>();
}