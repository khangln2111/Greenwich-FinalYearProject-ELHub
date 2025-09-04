using Domain.Common;
using Domain.Entities;

namespace Domain.Events.LectureEvents;

public record LectureUpdatedEvent(Lecture Lecture) : IBaseEvent;