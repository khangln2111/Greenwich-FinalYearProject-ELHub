using Domain.Common;
using Domain.Entities;

namespace Domain.Events.InstructorApplicationEvents;

public record InstructorApplicationResubmittedEvent(InstructorApplication InstructorApplication) : IBaseEvent;