using Domain.Common;
using Domain.Entities;

namespace Domain.Events.CourseEvents;

public record CourseBannedStatusSetEvent(Course Course) : IBaseEvent;