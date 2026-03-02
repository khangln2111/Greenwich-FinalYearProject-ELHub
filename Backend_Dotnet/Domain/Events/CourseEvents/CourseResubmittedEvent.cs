using Domain.Common;
using Domain.Entities;

namespace Domain.Events.CourseEvents;

public record CourseResubmittedEvent(Course Course) : IBaseEvent;