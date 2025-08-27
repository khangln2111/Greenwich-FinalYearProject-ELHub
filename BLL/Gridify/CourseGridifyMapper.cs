using DAL.Data.Entities;
using Gridify;

namespace BLL.Gridify;

public class CourseGridifyMapper : GridifyMapper<Course>
{
    public CourseGridifyMapper()
    {
        AddMap("Price", c => c.Price);
        AddMap("DiscountedPrice", c => c.DiscountedPrice);
        AddMap("DiscountPercentage", c => (1 - c.DiscountedPrice / c.Price) * 100);
        AddMap("Title", c => c.Title);
        AddMap("Summary", c => c.Summary);
        AddMap("Description", c => c.Description);
        AddMap("CategoryName", c => c.Category.Name);
        AddMap("CategoryId", c => c.CategoryId);
        AddMap("Status", c => c.Status);
        AddMap("InstructorName", c => c.Instructor.FirstName + " " + c.Instructor.LastName);
        AddMap("InstructorId", c => c.InstructorId);
        AddMap("Level", c => c.Level);
        AddMap("CreatedAt", c => c.CreatedAt);
        AddMap("UpdatedAt", c => c.UpdatedAt);
        AddMap("DurationInSeconds", c => c.DurationInSeconds);
        AddMap("SectionCount", c => c.SectionCount);
        AddMap("LectureCount", c => c.LectureCount);
        AddMap("EnrollmentCount", c => c.EnrollmentCount);
        AddMap("AverageRating", c => c.AverageRating);
        AddMap("ReviewCount", c => c.ReviewCount);


        // AddMap("DiscountedPrice", c => c.DiscountedPrice);
        // AddMap("DiscountPercentage", c => (1 - c.DiscountedPrice / c.Price) * 100);
        // AddMap("CategoryName", c => c.Category.Name);
        // AddMap("Title", c => c.Title);
        // AddMap("Description", c => c.Description);
        // AddMap("DurationInSeconds",
        //     c => c.Sections.SelectMany(s => s.Lectures).Sum(l => l.Video != null ? l.Video.DurationInSeconds : 0));
        // AddMap("CategoryId", c => c.CategoryId);
        // AddMap("SectionCount", c => c.Sections.Count);
        // AddMap("LectureCount", c => c.Sections.SelectMany(s => s.Lectures).Count());
        // AddMap("AverageRating", c => c.Enrollments
        //     .Where(e => e.Review != null)
        //     .Select(e => e.Review!.Rating)
        //     .Average());
        // AddMap("EnrollmentCount", c => c.Enrollments.Count);
        // AddMap("Price", c => c.Price);
        // AddMap("Status", c => c.Status);
        // AddMap("CreatedAt", c => c.CreatedAt);
        // AddMap("UpdatedAt", c => c.UpdatedAt);
        // AddMap("InstructorName", c => c.Instructor.FirstName + " " + c.Instructor.LastName);
        // AddMap("Level", c => c.Level);
    }
}