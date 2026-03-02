using Domain.Common;
using Domain.Entities;

namespace Domain.Events.OrderEvents;

public record OrderProcessedEvent(Order Order) : IBaseEvent;