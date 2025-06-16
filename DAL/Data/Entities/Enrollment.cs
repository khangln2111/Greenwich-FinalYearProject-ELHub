namespace DAL.Data.Entities;

public class Enrollment : BaseEntity
{
    public Guid CourseId { get; set; }

    public Course Course { get; set; } = null!;

    public Guid UserId { get; set; }

    public ApplicationUser User { get; set; } = null!;

    public ICollection<LectureProgress> LectureProgresses { get; set; } = new List<LectureProgress>();

    public Review? Review { get; set; }
}