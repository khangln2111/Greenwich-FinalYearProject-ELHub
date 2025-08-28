namespace Application.Common.Models;

public class CurrentUser
{
    public Guid Id { get; init; }
    public required string Email { get; init; }
    public IReadOnlyList<string> Roles { get; init; } = [];
}