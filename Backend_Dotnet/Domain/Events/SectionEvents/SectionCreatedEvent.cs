using Domain.Common;
using Domain.Entities;

namespace Domain.Events.SectionEvents;

public record SectionCreatedEvent(Section Section) : IBaseEvent;