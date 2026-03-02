namespace Application.Common.Models;

public record RecommendedCourseVm(
    Guid CourseId,
    string Title,
    string Summary,
    double Score
);

public record UserQueryDto(string Query);