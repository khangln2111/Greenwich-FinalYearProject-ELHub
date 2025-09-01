using Domain.Common;
using Domain.Entities;
using MediatR;

namespace Domain.Events.GiftEvents;

public record GiftCreatedEvent(Gift Gift) : IBaseEvent;