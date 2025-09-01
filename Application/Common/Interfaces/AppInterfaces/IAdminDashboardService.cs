using Application.DTOs.AdminDashboardDTOs;

namespace Application.Common.Interfaces.AppInterfaces;

public interface IAdminDashboardService
{
    Task<AdminDashboardVm> GetDashboard();
}