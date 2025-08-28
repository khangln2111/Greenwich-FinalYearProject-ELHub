namespace Domain.Entities;

public class Enrollment : BaseEntity
{
    public Guid CourseId { get; set; }

    public Course Course { get; set; } = null!;

    public Guid UserId { get; set; }

    public ApplicationUser User { get; set; } = null!;

    public ICollection<LectureProgress> LectureProgresses { get; set; } = new List<LectureProgress>();

    public Guid? ReviewId { get; set; }

    public Review? Review { get; set; }

    //Denormalized properties for performance optimization
    public int ProgressPercentage { get; set; }
}