using Domain.Common;
using Domain.Entities;
using MediatR;

namespace Domain.Events.GiftEvents;

public record GiftRedeemedEvent(Gift Gift) : IBaseEvent;