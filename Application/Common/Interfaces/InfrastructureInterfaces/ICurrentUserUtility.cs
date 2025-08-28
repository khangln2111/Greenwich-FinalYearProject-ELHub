using Application.Common.Models;

namespace Application.Common.Interfaces.InfrastructureInterfaces;

public interface ICurrentUserUtility
{
    CurrentUser? GetCurrentUser();
    bool IsAuthenticated();
}