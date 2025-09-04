using Domain.Common;
using Domain.Entities;

namespace Domain.Events.CourseEvents;

public record CourseUpdatedEvent(Course Course) : IBaseEvent;