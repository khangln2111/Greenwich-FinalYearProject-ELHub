using Domain.Common;
using Domain.Entities;

namespace Domain.Events.CourseEvents;

public record CourseSubmittedEvent(Course Course) : IBaseEvent;