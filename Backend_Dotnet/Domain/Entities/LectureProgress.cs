using Domain.Common;

namespace Domain.Entities;

public class LectureProgress : BaseAuditableEntity
{
    public Guid EnrollmentId { get; set; }
    public Enrollment Enrollment { get; set; } = null!;

    public Guid LectureId { get; set; }
    public Lecture Lecture { get; set; } = null!;

    public bool Completed { get; set; }

    public void ToggleCompleted()
    {
        Completed = !Completed;
    }
}