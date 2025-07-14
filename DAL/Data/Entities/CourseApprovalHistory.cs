namespace DAL.Data.Entities;

public class CourseApprovalHistory : BaseEntity
{
    public Guid CourseId { get; set; }
    public Course Course { get; set; } = null!;
    public bool IsApproved { get; set; }
    public required string Note { get; set; }
}