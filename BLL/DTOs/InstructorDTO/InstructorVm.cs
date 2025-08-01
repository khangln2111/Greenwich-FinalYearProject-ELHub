namespace BLL.DTOs.InstructorDTO;

public class InstructorVm
{
    public Guid Id { get; set; }

    public required string Name { get; set; }

    public string? AvatarUrl { get; set; }

    public string? ProfessionalTitle { get; set; }

    public string? About { get; set; }

    public string? FavoriteQuote { get; set; }

    public string? FavoriteQuoteCite { get; set; }

    public double AverageRating { get; set; }

    public int ReviewCount { get; set; }

    public int CourseCount { get; set; }

    public int StudentCount { get; set; }
}