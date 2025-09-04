using Domain.Common;
using Domain.Entities;

namespace Domain.Events.InstructorApplicationEvents;

public record InstructorApplicationCreatedEvent(InstructorApplication InstructorApplication) : IBaseEvent;