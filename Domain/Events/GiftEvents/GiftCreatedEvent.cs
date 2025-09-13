using Domain.Common;
using Domain.Entities;

namespace Domain.Events.GiftEvents;

public record GiftCreatedEvent(Gift Gift) : IBaseEvent;