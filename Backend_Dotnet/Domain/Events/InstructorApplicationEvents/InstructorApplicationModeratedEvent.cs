using Domain.Common;
using Domain.Entities;

namespace Domain.Events.InstructorApplicationEvents;

public record InstructorApplicationModeratedEvent(InstructorApplication InstructorApplication, bool IsApproved)
    : IBaseEvent;