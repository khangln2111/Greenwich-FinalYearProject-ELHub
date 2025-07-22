using DAL.Data.Entities;
using Gridify;

namespace BLL.Gridify;

public class CourseGridifyMapper : GridifyMapper<Course>
{
    public CourseGridifyMapper()
    {
        AddMap("DiscountedPrice", c => c.DiscountedPrice);
        AddMap("DiscountPercentage", c => (1 - c.DiscountedPrice / c.Price) * 100);
        AddMap("CategoryName", c => c.Category.Name);
        AddMap("Title", c => c.Title);
        AddMap("Description", c => c.Description);
        AddMap("DurationInSeconds",
            c => c.Sections.SelectMany(s => s.Lectures).Sum(l => l.Video != null ? l.Video.DurationInSeconds : 0));
        AddMap("CategoryId", c => c.CategoryId);
        AddMap("SectionCount", c => c.Sections.Count);
        AddMap("LectureCount", c => c.Sections.SelectMany(s => s.Lectures).Count());
        AddMap("Status", c => c.Status);
        AddMap("CreatedAt", c => c.CreatedAt);
        AddMap("UpdatedAt", c => c.UpdatedAt);
        AddMap("InstructorName", c => c.Instructor.FirstName + " " + c.Instructor.LastName);
    }
}