namespace BLL.DTOs.CourseDTOs;

public class InstructorVm
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string AvatarUrl { get; set; } = string.Empty;

    public string ProfessionalTitle { get; set; } = string.Empty;

    public string About { get; set; } = string.Empty;

    public double AverageRating { get; set; }

    public int ReviewCount { get; set; }

    public int CourseCount { get; set; }

    public int StudentCount { get; set; }
}