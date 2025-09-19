using Domain.Common;
using Domain.Entities;
using MediatR;

namespace Domain.Events.CourseEvents;

public record CourseBannedStatusSetEvent(Course Course) : IBaseEvent;