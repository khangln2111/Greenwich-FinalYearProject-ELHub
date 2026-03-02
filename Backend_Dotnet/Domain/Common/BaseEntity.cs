using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Common;

public class BaseEntity
{
    public Guid Id { get; init; } = Guid.NewGuid();

    private readonly List<IBaseEvent> _domainEvents = [];

    [NotMapped] public IReadOnlyCollection<IBaseEvent> DomainEvents => _domainEvents.AsReadOnly();

    public void AddDomainEvent(IBaseEvent domainEvent)
    {
        _domainEvents.Add(domainEvent);
    }

    public void RemoveDomainEvent(IBaseEvent domainEvent)
    {
        _domainEvents.Remove(domainEvent);
    }

    public void ClearDomainEvents()
    {
        _domainEvents.Clear();
    }
}