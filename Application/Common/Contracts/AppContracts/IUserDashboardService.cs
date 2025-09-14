using Application.Common.Contracts.GeneralContracts;
using Application.DTOs.UserDashboardDTOs;

namespace Application.Common.Contracts.AppContracts;

public interface IUserDashboardService : IAppService
{
    Task<UserDashboardVm> GetDashboard();
}