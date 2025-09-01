using Domain.Common;
using Domain.Entities;

namespace Domain.Events.ReviewEvents;

public record ReviewRepliedEvent(Review Review) : IBaseEvent;