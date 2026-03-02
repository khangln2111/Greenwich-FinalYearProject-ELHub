using Application.Common.Contracts.GeneralContracts;
using Application.DTOs.AdminDashboardDTOs;

namespace Application.Common.Contracts.AppContracts;

public interface IAdminDashboardService : IAppService
{
    Task<AdminDashboardVm> GetDashboard();
}