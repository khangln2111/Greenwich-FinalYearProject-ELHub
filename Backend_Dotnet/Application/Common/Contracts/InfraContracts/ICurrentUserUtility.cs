using Application.Common.Contracts.GeneralContracts;
using Application.Common.Models;

namespace Application.Common.Contracts.InfraContracts;

public interface ICurrentUserUtility : IInfraService
{
    CurrentUser? GetCurrentUser();
    bool IsAuthenticated();
}