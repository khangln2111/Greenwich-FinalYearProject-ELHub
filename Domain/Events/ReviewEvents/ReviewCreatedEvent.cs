using Domain.Common;
using Domain.Entities;

namespace Domain.Events.ReviewEvents;

public record ReviewCreatedEvent(Review Review) : IBaseEvent;