using Domain.Common;
using Domain.Entities;

namespace Domain.Events.LectureEvents;

public record LectureCreatedEvent(Lecture Lecture) : IBaseEvent;