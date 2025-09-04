using Domain.Common;
using Domain.Entities;

namespace Domain.Events.SectionEvents;

public record SectionUpdatedEvent(Section Section) : IBaseEvent;