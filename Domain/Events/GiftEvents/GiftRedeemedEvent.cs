using Domain.Common;
using Domain.Entities;

namespace Domain.Events.GiftEvents;

public record GiftRedeemedEvent(Gift Gift) : IBaseEvent;