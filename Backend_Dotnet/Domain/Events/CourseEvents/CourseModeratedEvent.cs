using Domain.Common;
using Domain.Entities;

namespace Domain.Events.CourseEvents;

public record CourseModeratedEvent(Course Course, bool IsApproved) : IBaseEvent;