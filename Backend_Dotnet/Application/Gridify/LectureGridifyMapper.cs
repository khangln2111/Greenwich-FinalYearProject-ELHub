using Domain.Entities;
using Gridify;

namespace Application.Gridify;

public class LectureGridifyMapper : GridifyMapper<Lecture>
{
    public LectureGridifyMapper()
    {
        AddMap("Title", c => c.Title);
        AddMap("Description", c => c.Description);
        AddMap("Duration", c => c.Video != null ? c.Video.DurationInSeconds : null);
        AddMap("SectionId", c => c.SectionId);
        AddMap("SectionTitle", c => c.Section.Title);
        AddMap("CourseId", c => c.Section.CourseId);
        AddMap("CreatedAt", c => c.CreatedAt);
        AddMap("UpdatedAt", c => c.UpdatedAt);
    }
}