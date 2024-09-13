using DAL.Data.Entities;
using Gridify;

namespace BLL.Gridify;

public class CourseGridifyMapper : GridifyMapper<Course>
{
    public CourseGridifyMapper()
    {
        AddMap("DiscountedPrice", c => c.Price - c.Price * c.DiscountPercentage / 100);
        AddMap("CategoryName", c => c.Category.Name);
        AddMap("Title", c => c.Title);
        AddMap("Description", c => c.Description);
        AddMap("Summary", c => c.Summary);
        AddMap("CategoryId", c => c.CategoryId);
        // AddMap("Duration", c => c.Sections.SelectMany(s => s.Lectures).Select(l => l.Duration)
        //     .Aggregate(TimeSpan.Zero, (total, next) => total.Add(next)));
        AddMap("SectionCount", c => c.Sections.Count);
        AddMap("LessonCount", c => c.Sections.SelectMany(s => s.Lectures).Count());
        AddMap("CreatedAt", c => c.CreatedAt);
        AddMap("UpdatedAt", c => c.UpdatedAt);
    }
}