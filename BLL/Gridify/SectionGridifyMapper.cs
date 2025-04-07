using DAL.Data.Entities;
using Gridify;

namespace BLL.Gridify;

public class SectionGridifyMapper : GridifyMapper<Section>
{
    public SectionGridifyMapper()
    {
        AddMap("Title", s => s.Title);
        AddMap("Description", s => s.Description);
        AddMap("LectureCount", s => s.Lectures.Count);
        // AddMap("Duration",
        //     s => s.Lectures.Select(l => l.Duration).Aggregate(TimeSpan.Zero, (total, next) => total.Add(next)));
        AddMap("DurationInSeconds", s => s.Lectures.Sum(l => l.Video != null ? l.Video.DurationInSeconds : 0));
        AddMap("CourseId", s => s.CourseId);
        AddMap("CreatedAt", c => c.CreatedAt);
        AddMap("UpdatedAt", c => c.UpdatedAt);
    }
}